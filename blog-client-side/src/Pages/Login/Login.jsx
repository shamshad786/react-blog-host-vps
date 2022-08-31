import './Login.css';
import {Link} from 'react-router-dom';
import { useContext, useRef } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';



const Login = () =>{

   const userRef =  useRef();
   const passwordRef = useRef();

   const {dispatch, isFetching} = useContext(Context);

const handleSubmit = async(e) =>{
    e.preventDefault();

    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post('/auth/login',{
            username: userRef.current.value,
            password:  passwordRef.current.value
        });

        console.log("Login Response ",res.data);

        dispatch({type: "LOGIN_SUCCESS", payload: res.data});

    }catch(err){
        console.log(err)
        dispatch({type: "LOGIN_FAILURE"});
    }
}

    return (
        <>
            <div className="login">
            <span className="loginTitle">Login</span>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input className="loginInput" type="text" placeholder="Enter Your Usernamae" autoComplete="new-password" ref={userRef}/>
                    <label>Password</label>
                    <input className="loginInput" type="password" placeholder="Enter Your Password" autoComplete="new-password" ref={passwordRef} />
                    <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
                </form>
                <button className="LoginRegisterButton">
                <Link className="link" to='/register'>Register</Link>
                </button>
                
            </div>

        </>
    )
}

export default Login;