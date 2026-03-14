import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
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
      var navigate=useNavigate();
     const checkLogin=(uname,pass)=>{ 
      alert(uname);
      alert(pass);
       axios.get(`http://localhost:1004/register/login/${uname}/${pass}`)
       .then((res)=>{ 
       console.log(res.data);
       if (uname==='admin' && pass==='admin'){
        navigate("/nav")
       }
       else if(res.data==='LOGIN SUCCESSFULL'){
        navigate("/navclient")
       }
       else{
        setMsg(res.data);
       }
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
      <h2 className='text-primary'>LOGIN FORM</h2>
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

         <button className='btn btn-outline-primary' onClick={()=>{
          checkLogin(register.uname,register.pass)
         }}>LOGIN</button> &nbsp;&nbsp;
         <button className='btn btn-outline-secondary' onClick={refreshData}>REFRESH</button>
          <h2>{ msg}</h2>
    </div>
  )
}

export default Login