import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./Reg.scss"
import ky from 'ky'
import authStore from '../store';





function User() {

    const jwt=authStore((state)=>(state.token))
 
    const addToken=authStore((state)=>state.setToken)


    const [errMail,setErrMail]=useState('')


    const postAuth=async(req)=>{
    
        const options = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        try{setErrMail("")
        const json = await ky.post('http://127.0.0.1:5000/login', { json: req, ...options ,  hooks: {
          
          
        } 
           },)
           console.log(json)
           addToken(json)
        }catch(e) { if (error.name === 'HTTPError') {} }
    
      }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = data => {delete data['confirm_password'];
    console.log(JSON.stringify(data) )
    postAuth(JSON.stringify(data))
    };


    return ( <>

{jwt ? (
        <div>Authenticated with JWT: </div>
      ) : (
        <form className="form-box" onSubmit={handleSubmit(onSubmit)} >
        <div className="Row" >
                 <input placeholder="email" {...register("email", { required:  "This field is required", maxLength: 25 , pattern: {
                   
                   value: /\S+@\S+\.\S+/,
                   message: "Entered value does not match email format"
                 }})} />
                 {errors.email && <span>{errors.email.message}*</span>}
                 <span>{errMail}</span>
       
       
       
                 
       
       
                 <input placeholder="password"
                   {...register("password", {
                     required: true
                   })}
                 />
       
                 {errors.password && <span>This field is required*</span>}
       
                
       
            
             <input type="submit" />
             </div>
           </form> 
      )}
    
   
    
    </> );
}

export default User;