import React from 'react'
import axios from 'axios'
import { useState } from 'react'
function Register() {
    let[register,setRegister]=useState({
        uname:"",
        pass:"",
        nm:"",
        email:"",
        phno:""
     })
     let[msg,setMsg]=useState("");
     const refreshData=()=>{ 
        setMsg("");
        setRegister({ 
        uname:"",
        pass:"",
        nm:"",
        email:"",
        phno:""
        })
     }
     let[errors,setErrors]=useState({
      euname:"",
        epass:"",
        enm:"",
        eemail:"",
        ephno:""
      })
      
     const addData=()=>{ 
       axios.post("http://localhost:1004/register/add",register)
       .then((res)=>{ 
       console.log(res.data);
       setMsg("REGISTRATION SUCCESSFUL");
       })
       .catch((error)=>{ 
        console.log(error);
        setErrors({ 
          euname:error.response.data.uname,
            epass:error.response.data.pass,
            enm:error.response.data.nm,
            eemail:error.response.data.email,
            ephno:error.response.data.phno,
        })
        //alert("SOMETHING WENT WRONG FOR STORING DATA");
        
       })
     }
  return (
    <div style={{width:"30%",margin:"50px auto"}}>
      <h2 className='text-primary'>REGISTER FORM</h2>
       <input type='text' className='form-control' value={register.uname} 
       onChange={(event)=>{ 
        setRegister({ 
            ...register,
            uname:event.target.value
        })
       }}
      placeholder='ENTER THE USERNAME'/>
      <h2 style={{color:"red"}}>{errors.euname}</h2>
      <input type='password' className='form-control' value={register.pass} 
       onChange={(event)=>{ 
        setRegister({ 
            ...register,
            pass:event.target.value
        })
       }}
      placeholder='ENTER THE PASSWORD'/>
      <h2 style={{color:"red"}}>{errors.epass}</h2>
      <input type='text' className='form-control' value={register.nm} 
       onChange={(event)=>{ 
        setRegister({ 
            ...register,
            nm:event.target.value
        })
       }}
      placeholder='ENTER THE NAME'/>
      <h2 style={{color:"red"}}>{errors.enm}</h2>
      <input type='text' className='form-control' value={register.email} 
       onChange={(event)=>{ 
        setRegister({ 
            ...register,
            email:event.target.value
        })
       }}
      placeholder='ENTER THE EMAIL'/>
      <h2 style={{color:"red"}}>{errors.eemail}</h2>
      <input type='text' className='form-control' value={register.phno} 
       onChange={(event)=>{ 
        setRegister({ 
            ...register,
            phno:event.target.value
        })
       }}
      placeholder='ENTER THE PHNO'/>
      <h2 style={{color:"red"}}>{errors.ephno}</h2>

         <button className='btn btn-outline-primary' onClick={addData}>REGISTER</button> &nbsp;&nbsp;
         <button className='btn btn-outline-secondary' onClick={refreshData}>REFRESH</button>
          <h2>{ msg}</h2>
    </div>
  )
}

export default Register