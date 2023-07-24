import { useState,useEffect} from 'react'
import Home from './pages/Home'
import Reg from './pages/Reg'
import {createBrowserRouter,createRoutesFromElements,Link,Route,Outlet, RouterProvider, useLocation} from 'react-router-dom'
import './App.scss'
import User from './pages/User'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import authStore  from './store'
import { QueryClient, QueryClientProvider, useQuery} from 'react-query';


import { ActionIcon, ColorScheme } from '@mantine/core';
import Word from './pages/Word'

const queryClient = new QueryClient()





function App(props) {

  
  
console.log()
 var user=false
 
  const router= createBrowserRouter(
 createRoutesFromElements(
  <Route path="/" element={<Root />}>
     <Route index element={<Home/>}/>

     <Route  path="/reg" element={<Reg/>}/>
      <Route  path="/login" element={<Login/>}/> 

       <Route  path="/words/*" element={<Word/>}/> 
     {/* <Route  path={"/words/"+`${word}`} element={<Word/>}/>  */}
     <Route  path="/user" element={<ProtectedRoute > <User/></ProtectedRoute>}/> 

     <Route path="*" element={<p>There's nothing here: 404!</p>} />
  </Route>
 )

  )

  const [count, setCount] = useState(0)



  return (
    <div ><RouterProvider router={router}/></div>
  )
}

const Root =()=>{
 
  return  <div >
  
  
  <QueryClientProvider client={queryClient}>
   
   <div className="links"> 
    <Link to="/" >Home</Link> 
    <Link to="/reg">Reg</Link>
    <Link to="/user">User</Link>
    <Link to="/login">Login</Link>
  </div>
    
  <div>
    <Outlet/>
    
  </div>
  
  </QueryClientProvider>
  </div>
}



export default App
