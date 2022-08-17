import React, { useState,useMemo  } from 'react'

import { useSelector } from 'react-redux'
import axios from 'axios'
import { API } from '../../backend'
import { useDispatch } from "react-redux"
import { makeReload } from "../../features/reload"
import { updateName } from '../../features/name'
import { HiPlus,HiCheck,HiX } from "react-icons/hi";
import Categorylist from './Categorylist'
import Footer from './Footer'


const CategoryInput = () => {
  //const [name, setName] = useState(" ")
  const reload = useSelector((state) => state.reload.value)
 
  const name = useSelector((state) => state.name.value)
  const [error,setError] = useState(" ")
  const [toggleUpdate, setToggleUpdate] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const dispatch = useDispatch()
  const [categoryCount,setCategoryCount] =useState(null)
  

  const createCategory = () => {
    axios.post(`${API}/category/`, {
      categoryName: name
    }).then(res => dispatch(makeReload(!reload))).catch(res=>setError("Something error"))
  }

  const addCategorySubmit = (e) => {
    e.preventDefault()
    
    if (toggleUpdate) {
        
        if(name.length > 16){
          setError("Please Enter Only 15 Characters")
      setTimeout(()=>setError(" "),4000)
      return

        }
      if (updateId !== null) {
        axios.put(`${API}/category/${updateId}/`, { categoryName: name }).then(res => dispatch(makeReload(!reload))).catch(res=>setError("Something error"))
        cancelUpdate()
        return
      }
      else
        return
    }
    if(name==="" || name===" ")
    {
      setError("Please Enter the Category Name")
      setTimeout(()=>setError(" "),4000)
      return
    }
    if(name.length > 16)
    {
      setError("Please Enter Only 15 Characters")
      setTimeout(()=>setError(" "),4000)
      return

    }
    createCategory()
    dispatch(updateName(""))

  }


  const cancelUpdate = () => {
    setToggleUpdate(false)
    dispatch(updateName(""))
  }



{/* <HiPlus className='btn-addCategory ' /> */}

  return (
    <>
 {/*  {categoryCount !==0 ? (<></>):(<div className='flex justify-center items-center mt-3 mb-1'>Please Add Category</div>)}  */}
<div className="inputLayout  py-4 ">
      <div className='border-b'>
        <form onSubmit={(e) => addCategorySubmit(e)} className='px-10' >

     
        {/* <div className='mb-2 font-mono  text-sm md:text-lg '>Add Category</div> */}
          <div className='flex  '>
            
            <input type="text" className='input-category max-w-xs'  placeholder='Add Category'
             onChange={(e)=>dispatch(updateName(e.target.value)) }  value={name} />
             
{/* IN SUBMIT BUTTON
  1.Toggle to update and cancel btn if toggleUpdate is True
                  |-> this toggle's update and cancel btn are in flex  
  2. I toggleUpdate is false it shows Add btn 
  3. In mobile view (till 768px (md)) plus , tick, cross symbols are used. */}           
            
            <button type='submit' className='ml-2'>
              {toggleUpdate ? 
              (<>
              <span className='btn-update hidden md:block'>Update </span>
              
              <div className="flex items-center md:hidden">
              <span className='text-blue-500 text-2xl '><HiCheck /></span>
              <span onClick={cancelUpdate} type='reset' className=' text-red-500 text-xl ml-2 md:hidden'> <HiX />
             </span>
              </div>
             
              
              </>)
               : 
              (<>
              <span className='btn-addCategory hidden md:block'>Add</span>  
              <span className='md:hidden text-blue-500 text-2xl'><HiPlus /></span>
              </>)
              
              
              } 
              </button>
            {toggleUpdate && 
            (<>
            <span onClick={cancelUpdate} type='reset' className='btn-cancel hidden md:block'>Cancel
             </span>
            
            </>)}
         
         
         
         
          </div>
       

        </form>

        {error && <span className='text-red-500 text-sm ml-[10%] md:ml-[4%]'>{error}</span>}
      </div>
      {
        ( categoryCount !==null && categoryCount !==0 ) &&
        (
          <div className="flex justify-center items-center text-gray-500 font-mono text-sm md:text-base ">
          <div>
          Category Lists - { categoryCount}
          </div>
          
        </div>

        )
      }
 
  <div>
    <Categorylist 
    setToggleUpdate={setToggleUpdate} 
    setUpdateId={setUpdateId} 
    setCategoryCount={setCategoryCount}
    categoryCount={categoryCount}
    /></div>
      
  
  </div>

<hr/>
 <Footer />
    </>
  )
}

export default CategoryInput