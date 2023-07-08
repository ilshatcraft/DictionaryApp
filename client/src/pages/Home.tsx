import ky from "ky"
import { io } from 'socket.io-client';
import {useEffect,useState } from 'react'
import Select from 'react-select'

import AsyncSelect from 'react-select/async';


const Home = () => {


  const options =([ 
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
          let newOptions = [];
          for (let i of list) {
            newOptions.push({ value: i, label: i });
          }
          resolve(newOptions);
        });
      });
      return words;
    } catch (error) {
      console.error(error);
    }
  };
  




    
    return ( <>
  

<AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
    </> );
}
 
export default Home;