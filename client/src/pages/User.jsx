import authStore from "../store";
import ky from "ky";
import React, { useEffect ,useState,Component} from 'react';
import { Navigate ,redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery} from 'react-query';


const queryClient = new QueryClient()

    
function User() {


  const [info, setInfo] = useState("");
  const jwt=authStore((state)=>(state.token))
  const addToken=authStore((state)=>state.setToken)
  const deleteToken=authStore((state)=>state.removeToken)
  const RequestCreating = () => {
      console.log(jwt)
      AuthChecking()

    //  AuthChecking({}); // Call the function immediately
  }

  const remtoken=()=>{
    deleteToken()
    redirect("/login");
  }

  const AuthChecking = async (req) => {
    // const options = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-access-token': jwt
    //     }
    // };

    try {
      const response = await ky.get('http://127.0.0.1:5000/UserInfo', 
        {  headers: {
          'Content-Type': 'application/json',
          'x-access-token': jwt
      } },
      );
      const data = await response.json();
      console.log(data.message)
      setInfo(data.message)
      
    } catch (error) {
      if(error.response.status==401 ){

        deleteToken()
        redirect("/login");
        
       }
      console.error(error);

    }
    


    }
  
    const {data,isLoading,isError}= useQuery('user',RequestCreating)
    if(isLoading){
      return <>загрузка </>
    }
    if(isError){
      return <>оштибка </>
    }
    if(!data){
      return <>нет данных </>
    }

    return (  <>
      
  
    user d
     {data}
     <button onClick={remtoken}></button>
     </> );
}

export default User;