import { useState,useEffect} from 'react'
import Home from './pages/Home'
import Reg from './pages/Reg'
import {createBrowserRouter,createRoutesFromElements,Link,Route,Outlet, RouterProvider} from 'react-router-dom'
import './App.scss'
import User from './pages/User'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import authStore  from './store'
import { QueryClient, QueryClientProvider, useQuery} from 'react-query';

import './colorscheme.scss'

import { ActionIcon } from '@mantine/core';

const queryClient = new QueryClient()





function App() {

const [theme,setTheme]=useState('light')

  useEffect(() => {
    const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    setTheme(currentTheme);
  }, []);

  const togglechange=()=>{
   const toggletheme=theme=='dark'?'light' :'dark'
    setTheme(toggletheme)
  };
  

 var user=false
 

  const router= createBrowserRouter(
 createRoutesFromElements(
  <Route path="/" element={<Root/>}>
     <Route index element={<Home/>}/>

     <Route  path="/reg" element={<Reg/>}/>
      <Route  path="/login" element={<Login/>}/> 
     <Route  path="/user" element={<ProtectedRoute > <User/></ProtectedRoute>}/> 

     <Route path="*" element={<p>There's nothing here: 404!</p>} />
  </Route>
 )

  )

  const [count, setCount] = useState(0)



  return (
    <div className='App' data-theme={theme}><RouterProvider router={router}/></div>
  )
}

const Root =()=>{
 
  return  <div className='header' >
  
  <ActionIcon  size="xl" radius="xs" className='coloricon'>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05L3.515 4.93ZM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414l-2.121-2.121Zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414l2.121-2.121ZM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414l2.121-2.121ZM23 11v2h-3v-2h3ZM4 11v2H1v-2h3Z"/></svg>
    </ActionIcon>
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
