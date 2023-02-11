import { useState} from 'react'
import Home from './pages/Home'
import Reg from './pages/Reg'
import {createBrowserRouter,createRoutesFromElements,Link,Route,Outlet, RouterProvider} from 'react-router-dom'
import './App.scss'


function App() {

  const router= createBrowserRouter(
 createRoutesFromElements(
  <Route path="/" element={<Root/>}>
     <Route index element={<Home/>}/>

     <Route  path="/reg" element={<Reg/>}/>
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
  </div>
  <div>
    <Outlet/>
  </div>
  </>
}



export default App
