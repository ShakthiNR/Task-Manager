import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { HiPlus,HiCheck,HiX } from "react-icons/hi";
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import {makeReload} from '../../features/reload'
import { API } from '../../backend'
import TaskList from './TaskList'



const TaskForm = ({categoryId,allTasks}) => {
const [taskUpdateId,setTasksUpdateId] = useState("")
  const reload3 = useSelector((state) => state.reload.value)

  const [taskStatus,setTaskStatus] =  useState(true)
  const dispatch = useDispatch()
  const [toggleUpdate,setToggleUpdate] = useState(false)
const [task,setTask] = useState("")
const[error,setError] =useState(false)
const addTask =()=>{
  axios.post(`${API}/tasks/`,{taskName:task,category:categoryId}).then(res => {
    
    dispatch(makeReload(!reload3)) //make the reload. Again categories get method is called
  }
    )
}
const deleteTask =(delTaskId,delTaskName)=>{
  var delRes = window.confirm(`Are You Want to delete ${delTaskName} task`)
  if(delRes){
    axios.delete(`${API}/tasks/${delTaskId}`).then(res =>{
    dispatch(makeReload(!reload3))
  } ) 
}
}
const handleSubmit = (e)=>{
  e.preventDefault()

  if(task==="")
  {
    setError("TaskName Required!!!")
    setTimeout(()=>setError(" "),4000)
    return

  }
  if(task.length>30)
  {
    setError("Please Enter the Task with 30Characters")
    setTimeout(()=>setError(" "),5000)
    return
  }
  if(toggleUpdate && task !=="" && taskUpdateId !==0)
  {
    console.log("s",task,categoryId,taskUpdateId);
     axios.put(`${API}/tasks/${taskUpdateId}/`,{taskName:task,category:categoryId})
     .then(res =>dispatch(makeReload(!reload3)))
      setToggleUpdate(false)
      setTask("")
      return
  }
  addTask()
  setTask("")
  
}
const handleChange =(e)=>{
  setTask(e.target.value)
}




var Tasklength = allTasks && 
allTasks.filter(e=>e.id===categoryId).map(e=>e.tasks.length) 

var PendingTasksArr = (allTasks && Tasklength) 
&& allTasks.filter(e=>e.id===categoryId).map(e=>e.tasks.filter((e)=>e.completed!==true).map((e)=>e.completed))[0]



const res =  allTasks.filter(e=>e.id===categoryId)
.map(e=>e.tasks.map(e =>Object.fromEntries(Object.entries(e).slice(0, 4)))
.map((eachTask,i)=>
eachTask
 ).map(e=>e) )[0]
 


const deleteAll =(categoryId)=>{
  console.log("clik",categoryId);
  var deleteAllConfrm = window.confirm('ARE YOU SURE TO DELETE ALL THE TASKS !!!')
  //Based on categoryID deleteall in Tasks table
  if(deleteAllConfrm)
  {
    axios.delete(`${API}/deleteall/${categoryId}/`).then(res=>dispatch(makeReload(!reload3)))
    return
  }
}

const handleCancelUpdate =()=>{
 
  setTask("")
  setToggleUpdate(false)
}
const taskDetails = ()=>{
  
}
  return (
    <div>
      
  <div className='tasksLayout'>   

<div className='taskForm'>
      <form onSubmit={handleSubmit}>

        <div className="flex items-center py-1 mx-4 md:mx-28  ">

        <input type="text" onChange={handleChange} 
        className='inputTasks' value={task} placeholder='Add the Tasks' />


        <button type="submit">
          {toggleUpdate ? (<>
          <span className='hidden md:block btn-addTask rounded-r-none'>Update</span>
          <div className='flex md:hidden items-center mt-3'>
            <span className='text-blue-500 text-xl'><HiCheck /></span>
            <span className='text-red-500 text-xl'><HiX /></span>

          </div>

          </>):(<div className='flex'>
          <span className='hidden md:block btn-addTask'>Add </span>
          <span className='md:hidden text-purple-400 text-xl mt-3'><HiPlus/></span>

          </div>)}
          
          
          </button>
        
        {toggleUpdate && (
          <>
           <button className='btn-taskcancel hidden md:block py-[1%]' onClick={handleCancelUpdate} >Cancel</button>
       
          </>
        )
       
        }
        
        
        
       
        </div>
        {error && <div className='errorMsg'>{error}</div>}

      
      </form>






{

res.length === 0 ? 
(<div className='text-center mt-3 text-gray-500 text-sm md:text-base font-mono'>Please Add Some Tasks</div>):

(<>
{/*  {<span className='ml-40'>Tasks Length is - {Tasklength}</span>} &nbsp; */}








</>)}
<div className='flex justify-end m-2'>
{//right-[14%] md:right-[9%] lg:right-[13%] xl:right-[25%]
  res.length !== 0 && <button className='mx-0 md:mx-28 btn-cancel rounded-r-none ' onClick={()=>deleteAll(categoryId)} > Delete All Tasks </button>
}
</div>



<div className='taskList font-mono flex flex-col items-center '>

{ res && res.map((el,i)=>{
 
return(


        <TaskList 
        key={i}
        task = {task}
        setTask={setTask}
        setTasksUpdateId={setTasksUpdateId}
        setToggleUpdate={setToggleUpdate}
        taskNum={i} 
        taskName={el.taskName} status={el.completed} 
        category={el.category}
        deleteId={el.id} deleteTask={deleteTask} 
        />


)
}
    ) }
</div>
{taskStatus &&
<div className='text-right  mt-1 text-xs  md:text-sm  font-mono text-gray-500 mb-2 mr-2 md:mr-10'>
{ (Tasklength > 0 && PendingTasksArr.length > 0) ?
(<> {PendingTasksArr.length} / {Tasklength} Tasks Pending</>)
: (res.length >0 && <>All Tasks are completed</>)
}
</div>
}
</div>
      
    </div>
    </div> 
  )
}

export default TaskForm