import ky from "ky"


const Home = () => {
async function getInfo(){
const info=await ky
 .get("http://127.0.0.1:5000/")
 .json();
console.log(info)
}

    
    return ( <div>asdasd

<button onClick={getInfo}> GETINFO</button>

    </div> );
}
 
export default Home;