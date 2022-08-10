import  { useContext } from 'react'
import './Login.css'
import { useState } from 'react'
import {AuthContext} from "../../context/AuthContextFor"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


//in this don't refer that its my concept
const Login = () => {
   
    const navigate=useNavigate()
    const [credentials,setCredentials]=useState({
        username:"",
        password:""
    })
    const {user,loading,error,dispatch}=useContext(AuthContext)

    const handleChange=(e)=>{
        setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}))
    }

    const handleClick=async (e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
            const res=await axios.post("http://localhost:5000/api/auth/login",credentials)
            dispatch({type:"LOGIN_SUCCESS",payload:res?.data})
            console.log(res.headers);
            navigate("/")
        } catch (error) {
            // console.log(error.response.data.message);//in video the create separeate error in backend
            //but we are not use that way so we use this way
            dispatch({type:"LOGIN_FAILURE",payload:error.response.data.message})
        }
    }
    console.log(user);
    // console.log(error);
  return (
    <div className='login'>
        <div className="loginContainer">
            <h1 className="loginHeading">LOGIN</h1>
            { error && <span className="error">{error}</span>}
            <input type="text" id='username' placeholder='User Name' className="loginInput" onChange={handleChange}/>
            <input type="password" id="password" placeholder='password' className="loginInput" onChange={handleChange}/>
            <button onClick={handleClick} disabled={loading} className='loginButton'>Login</button>
            
        </div>
    </div>
  )
}

export default Login