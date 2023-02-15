import { useState} from 'react'
import Home from './pages/Home'
import Reg from './pages/Reg'
import {createBrowserRouter,createRoutesFromElements,Link,Route,Outlet, RouterProvider} from 'react-router-dom'
import './App.scss'
import User from './pages/User'


function App() {

  const router= createBrowserRouter(
 createRoutesFromElements(
  <Route path="/" element={<Root/>}>
     <Route index element={<Home/>}/>

     <Route  path="/reg" element={<Reg/>}/>
     <Route  path="/user" element={<User/>}/>
  </Route>
 )

  )

  const [count, setCount] = useState(0)

  return (
    <div className='App'><RouterProvider router={router}/></div>
  )
}

const Root =()=>{
  return <>
   <div> 
    <Link to="/" >Home   </Link>
    <Link to="/reg">     Reg</Link>
    <Link to="/user">     User</Link>

  </div>
  <div>
    <Outlet/>
  </div>
  </>
}



export default App
