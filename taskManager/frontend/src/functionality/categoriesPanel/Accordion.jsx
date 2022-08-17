import React, { useState } from 'react'
import { HiChevronUp, HiOutlinePencil, HiX } from 'react-icons/hi';
import {HiChevronDown} from 'react-icons/hi'
import { BsFillCaretDownFill,BsFillCaretUpFill } from 'react-icons/bs';
import TaskForm from '../taskPanel/TaskForm';
import { useEffect } from 'react';

const Accordion = ({categoryId,categoryname,values,keyId,handleUpdate,handleDelete}) => {
    const [isActive, setIsActive] = useState(false);


  return (
    <>
    <div className="accordion-item">
        
<div className="flex items-center  nameStyle">
    
        <div  className={keyId % 2 ? 'list-layout mb-2  w-64' : `list-layout w-64  mb-2  `} onClick={() => setIsActive(!isActive)}>
            
        <div>{isActive ? <HiChevronUp /> :<HiChevronDown />} </div>
   <div className={keyId % 2 ? ' right-text1 ' : `right-text2   `}> {categoryname} </div>
           
            <div></div>

            
        </div>
  <div>
    <div className="flex items-center justify-center">
  <button className='ml-3 text-sm md:text-xl text-purple-500 '  onClick={() => handleUpdate(categoryId, categoryname)}>
                      <HiOutlinePencil />

             </button>
  <button className='tryDelete tex-sm md:text-xl mx-2 mt-2  mb-2' onClick={() => handleDelete(categoryId,categoryname)}>  <HiX/> </button>
  </div>
    </div>    
    </div>
        {isActive && <TaskForm categoryId={categoryId} allTasks={values} />}
    </div>
    
    </>
  )
}

export default Accordion