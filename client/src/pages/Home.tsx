import ky from "ky"

import {useState} from "react"

import React from 'react'
import Select from 'react-select'
const Home = () => {
// async function getInfo(){
// const info=await ky
//  .get("http://127.0.0.1:5000/")
//  .json();
// console.log(info)
// }


const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
]

const MyComponent = () => (
  <Select options={options} />
)



    
    return ( <>
  
<MyComponent></MyComponent>
    </> );
}
 
export default Home;