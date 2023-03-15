import authStore from "../store";

function User() {
    console.log('d')
    console.log(authStore((state)=>state.token))
    return ( <>
    user d
    
    </> );
}

export default User;