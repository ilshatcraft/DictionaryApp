import authStore from "../store";
import ky from "ky";
import React, { useEffect ,useState} from 'react';







function User() {
    const [info, setInfo] = useState("");
    const jwt=authStore((state)=>(state.token))
    const addToken=authStore((state)=>state.setToken)


    








    
        useEffect(() => {
            addToken('hdfthgf')
            console.log(jwt)
            const AuthChecking=async(req)=>{
            const options = {
                headers: {
                    
                    'x-access-token': jwt
                
                }
              };

              
    
                
                
              try {
                const response = await ky.post('http://127.0.0.1:5000/UserInfo', 
                  { json: req, ...options ,  hooks: { } },
                );
                const data = await response.json();
                

              } catch (error) {
                console.error(error);
              }
          
        
        
              }
          }, [])
        
    
      
    

    return ( <>
    user d
     {info}
    </> );
}

export default User;