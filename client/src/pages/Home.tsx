import ky from "ky"
import { io } from 'socket.io-client';
import {useEffect,useState } from 'react'

import { Autocomplete } from '@mantine/core';

import AsyncSelect from 'react-select/async';

import './Reg.scss'


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

  useEffect(() => {
    const newSocket = io("http://localhost:5000/searchwords");
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();

    }
  }, []);

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

  const [value, setValue] = useState('');
    
    return ( <>
    <div className="form-box">
  <Autocomplete value={value} onChange={change}  data={options} filter={filter} />
  </div>

    </> );
}
 
export default Home;