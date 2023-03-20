import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./Reg.scss"
import ky from 'ky'
import authStore from '../store';





function User() {

    
    
    const addToken=authStore((state)=>state.setToken)
    
    const deleteToken=authStore((state)=>state.removeToken)

    const [errMail,setErrMail]=useState('')


    const postAuth=async(req)=>{
    
        const options = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '
          }
        };
  
 
    
      try {
        const response = await ky.post('http://127.0.0.1:5000/login', 
          { json: req, ...options ,  hooks: { } },
        );
        const data = await response.json();
        const token = data.token;
        addToken(token);
        console.log(token);
      } catch (error) {
        console.error(error);
      }
  


      }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = data => {delete data['confirm_password'];
    console.log(jwt)
    postAuth(JSON.stringify(data))
    };
    const jwt=authStore((state)=>(state.token))

    return ( <>

{jwt ? (<>
        <div>Authenticated with JWT:{} </div>
        <button onClick={() =>{deleteToken()}}> Log Out</button>
        </>
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