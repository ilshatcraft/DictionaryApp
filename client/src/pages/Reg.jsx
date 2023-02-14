import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./Reg.scss"
import ky from 'ky'

const Reg = () => {
  
  const postRegistration=async(req)=>{
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const json = await ky.post('http://127.0.0.1:5000/reg', { json: req, ...options ,  hooks: {
      beforeError: [
        error => {
          const {response} = error;
          if (response && response.body) {
            error.name = 'MailAlreadyExist';
            error.message = `${response.body.message} (${response.status})`;
          }
  
          return error;
        }
      ]
    }       },)

  }
 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = data => {delete data['confirm_password'];
    console.log(JSON.stringify(data) )
      postRegistration(JSON.stringify(data))
    };
  
    const Log =()=>{
      console.log(watch("example")); // watch input value by passing the name of it
  
    }
    
    const password = useRef({});
    password.current = watch("password", "");

   

    return ( 
  <>
    <form className="form-box" onSubmit={handleSubmit(onSubmit)} >
 <div className="Row" >
          <input placeholder="email" {...register("email", { required:  "This field is required", maxLength: 25 , pattern: {
            
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
          }})} />
          {errors.email && <span>{errors.email.message}*</span>}



          <input placeholder="name"{...register("name", { required: true, pattern: /^[A-Za-z]+$/i })} />
          {errors.name && <span>This field is required*</span>}


          <input placeholder="password"
            {...register("password", {
              required: true
            })}
          />

          {errors.password && <span>This field is required*</span>}

          <input placeholder="repeat password"
            {...register("confirm_password", {
              required: true,
              validate: (val) => {
                if (watch('password') != val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />

{errors.confirm_password && <span>passwords must be equal*</span>}
       



     
      <input type="submit" />
      </div>
    </form> 
    </>
    );
}
 
export default Reg;