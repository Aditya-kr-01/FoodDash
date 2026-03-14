import axios from 'axios';
import React, { useState } from 'react'

function AddFood() {
    let[food,setFood]=useState({
        fid:"",
        fname:"",
        price:""
    })
    let[msg,setMsg]=useState("");
    let[errors,setErrors]=useState({
        efname:"",
        eprice:""
    })
    const addData=()=>{
        axios.post("http://localhost:1004/food/add",food)
        .then((res)=>{
            console.log(res.data);
            setMsg(res.data);
        })
        .catch((error)=>{
            console.log(error)
            setErrors({
                efname:error.response.data.fname,
                eprice:error.response.data.price
            })
            // alert("Something went wrong😣");
        })
    }
    const refreshData = () => {
    setFood({
        fid:"",
        fname:"",
        price:""
    })
    setMsg("")
  }
  return (
    <div style ={{width:"30%", margin:"50px auto"}}>
        <h2 className='text-primary'>Add Food form</h2>
        <input type='text' className='form-control'value={food.fid}
        onChange={(event)=>{
            setFood({
                ...food,
                fid:event.target.value
            })
        }}
        placeholder='Enter the food id' />
      <input type='text' className='form-control'
      value={food.fname}
        onChange={(event)=>{
            setFood({
                ...food,
                fname:event.target.value
            })
        }} placeholder='Enter the food name' />
        <h2 style={{color:"red"}}>{errors.efname}</h2>
      <input type='text' className='form-control'
      value={food.price}
        onChange={(event)=>{
            setFood({
                ...food,
                price:event.target.value
            })
        }} placeholder='Enter the price' />
        <h2 style={{color:"red"}}>{errors.eprice}</h2>
      <button className='btn-btn-outline-primary'onClick={addData}>Add Food</button>&nbsp;&nbsp;
      <button className='btn-btn-outline-secondary' onClick={refreshData}>Refresh</button>
      <h2>{msg}</h2>
    </div>
  )
}

export default AddFood