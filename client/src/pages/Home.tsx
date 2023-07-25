import ky from "ky"
import { io } from 'socket.io-client';
import {useEffect,useState } from 'react'

import { Autocomplete } from '@mantine/core';

import AsyncSelect from 'react-select/async';

import './Reg.scss'

import { redirect } from "react-router-dom";


import { useNavigate } from "react-router-dom";


const Home = () => {


  const [options, setOptions] =useState([ 
{ value: 'type', label: 'type' },
{ value: 'to', label: 'to' },
{ value: 'find', label: 'find' },
{ value: 'word', label: 'word' },
])

const promiseOptions = (inputValue: string) =>
  new Promise<(typeof options)[]>((resolve) => {
    setTimeout(() => {
      resolve(handleChange(inputValue));
    }, 400);
  });



const [socket, setSocket] = useState<SocketIOClient.Socket>();

const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    socket.on('connected', (data: any) => {
      console.log(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    

  }, [socket]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.send(message);
     
    }
  };
 
  const handleChange = async (value: any) => {
    sendMessage(value);
    try {
      const words = await new Promise((resolve, reject) => {
        socket.on('response', (data: any) => {
          console.log('received data ' + data);
          const list = data.toString().split(',');
          console.log(list)
          let newOptions = [];
          for (let i in list) {
            newOptions.push({ value: list[i], label: list[i] });
            if (i=="3"){break}
          }
          resolve(newOptions);
        });
      });
      setOptions(words);
    } catch (error) {
      console.error(error);
    }
  };
  
const change =(value:string)=>{
  setValue(value)
  handleChange(value)


}
const filter =()=>{
  return true
}


const socketConnected=()=>{
const newSocket = io("http://localhost:5000/searchwords");
    setSocket(newSocket);}
const socketDisconected=()=>{
  return socket.disconnect();
}

  const [value, setValue] = useState('');
    

  const handleSelectOption = (value:{}) => {
    // Here, you can add any additional logic related to the selected option if needed
    console.log('Selected Option:', value.value);
  
    
    // Redirect to a new page using the history.push method
    return(navigate('/words/'+`${value.value}`))
  };


    return ( <>
    <div className="form-box">
  <Autocomplete 
  value={value} 
  onChange={change}  
  data={options} 
  filter={filter}
  onDropdownOpen={()=>{socketConnected()}}
   onDropdownClose={()=>{socketDisconected()}}
   onItemSubmit={(item: AutocompleteItem) => handleSelectOption(item)}
   />
  </div>

    </> );
}
 
export default Home;