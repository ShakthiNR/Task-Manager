import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { API } from '../../backend'
import { makeReload } from '../../features/reload'

const TaskList = ({taskNum, task,setTask,setTasksUpdateId,setToggleUpdate, taskName,status,deleteId,deleteTask,category}) => {

const reload4 = useSelector((state) => state.reload.value)
  const dispatch = useDispatch()




    const updateStatus =(taskId,taskName,completed,categoryId)=>{
      //  console.log("results are",taskId,taskName,completed,categoryId);
         axios.put(`${API}/tasks/${taskId}/`,{taskName,completed,category:categoryId})
        .then(res => dispatch(makeReload(!reload4)) )
         
    }


    const handleToggle =()=>{
        
        updateStatus(deleteId,taskName,!status,category)
    }
    const updateTask =()=>{
        console.log("clicked",task);
        setTask(taskName)
        setTasksUpdateId(deleteId)
        setToggleUpdate(true)
    }
   
  return (
    <>
    <div className=''>
   
        <div onClick={handleToggle} className="pointer" >
          <div className="flex text-sm my-2  ">
          <div className="flex items-center justify-between border-b">
            <div  className={status ? "text-emerald-500":" " }> <BsCheckCircle/></div>
            <div className={status ? "completedStatus  w-56 md:w-72 text-center":"  w-56 md:w-72 text-center" }>{taskName} </div>&nbsp; 
          </div>
          <div className='flex items-center mt-1 text-sm md:text-lg'>
            <div> <button onClick={updateTask} className='text-purple-600' ><TbEdit/></button></div>&nbsp; 
            <div><button onClick={()=>deleteTask(deleteId,taskName)} className='text-red-500'><AiOutlineDelete/></button> </div>
          </div>
          </div> 
           </div>
         
       
  
  
    </div>
    
    </>
  )
}

export default TaskList