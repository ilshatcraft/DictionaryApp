import ky from "ky"
import { io } from 'socket.io-client';
import {useEffect,useState } from 'react'
import Select from 'react-select'
const Home = () => {
// async function getInfo(){
// const info=await ky
//  .get("http://127.0.0.1:5000/")
//  .json();
// console.log(info)
// }



const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

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

    socket.on('response', (data: any) => {
      console.log('recieved data '+(data));
    });

  }, [socket]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.send(message);
     
    }
  };
 
  const handleChange = (value: any) => {
    sendMessage(value);
  
  };
const MyComponent = () => (
  <Select options={options}    onInputChange={handleChange} />
)



    
    return ( <>
  
<MyComponent></MyComponent>
    </> );
}
 
export default Home;