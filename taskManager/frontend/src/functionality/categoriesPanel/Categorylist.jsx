import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { API } from '../../backend'
import { useDispatch } from "react-redux"
import { makeReload } from "../../features/reload"
import { updateName } from '../../features/name'
import { HiOutlinePencil, HiX } from "react-icons/hi";
import {activateDiv} from "../../features/opendiv"
import TaskForm from "../taskPanel/TaskForm"
import Accordion from './Accordion'

const Categorylist = ({ setToggleUpdate, setUpdateId,categoryCount,setCategoryCount }) => {
  const reload2 = useSelector((state) => state.reload.value)
  const openDiv2 = useSelector((state) => state.opendiv.value)
  const [loading,setLoading] =useState(true)


const [divId,setDivId] = useState(null)
  const [error, setError] = useState(" ")

  const dispatch = useDispatch()
  const [values, setValues] = useState(null)
  const getAllCategory = () => {
    axios.get(`${API}/category/`).then((response) => {
     
      setValues(response.data);
     
      setLoading(false)
      
    }).catch(function (error) {
      setError("Something Went Wrong !!", error.response.data)
    })
  }

  useEffect(() => {
    getAllCategory()
  }, [reload2])


  const handleDelete = (id,delCalName) => {

     if (id) {
      var result = window.confirm(`Are You Sure Want to delete ${delCalName} Category ?`);
      if (result)
        axios.delete(`${API}/category/${id}`).then(res => dispatch(makeReload(!reload2)))


    } 

  }
  const handleUpdate = (id, cName) => {

    dispatch(updateName(cName))
    setToggleUpdate(true)
    setUpdateId(id)


  }

  const handleOpenDiv =(id)=>{
  
    dispatch(activateDiv(!openDiv2))
  
    setDivId(id)
 
  }
  
    let counter = 0;
    for (let i = 0; i < values?.length; i++) {
       counter++; 
    }
    setCategoryCount(counter)
    
  return (
    <>

{loading && <div className='flex justify-center text-gray-400 font-mono'>Loading ...</div> }

      <div className='p-1 px-10 '>
        {error && <span className='errorMsg'>{error}</span>}
        
        {values && values.length>0 ? values.map(
          (e, i) => <div key={i}>
            <Accordion categoryId={e.id} values={values} categoryname={e.categoryName} keyId={i} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            </div>
        ) : (!loading &&<div className='text-gray-500 flex justify-center font-mono'>Please Add some Category</div>)
        
        }




      </div>







    </>
  )
}

export default Categorylist