import { useState} from 'react'
import Home from './pages/Home'
import Reg from './pages/Reg'
import {createBrowserRouter,createRoutesFromElements,Link,Route,Outlet, RouterProvider} from 'react-router-dom'
import './App.scss'
import User from './pages/User'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import authStore  from './store'
import { QueryClient, QueryClientProvider, useQuery} from 'react-query';


const queryClient = new QueryClient()

function App() {
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
    <div className='App'><RouterProvider router={router}/></div>
  )
}

const Root =()=>{
  return <QueryClientProvider client={queryClient}>
   <div className="header"> 
    <Link to="/" >Home</Link> 
    <Link to="/reg">Reg</Link>
    <Link to="/user">User</Link>
    <Link to="/login">Login</Link>
  </div>
  <div>
    <Outlet/>
  </div>
  </QueryClientProvider>
  
}



export default App
