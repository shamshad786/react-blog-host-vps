import './Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const Register = () =>{

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = async (e)=>{

        e.preventDefault()
      
        setLoading(true)
        setError(false)
        try{
            const res = await axios.post("/auth/register",{
                username,
                email,
                password
            });
    
            console.log(res.data)

            if(res.data.status === 409){
                setLoading(false)
                setError(true);
            }else if(res.data.status === 201){
                setLoading(false)
                window.location.replace("/login");
            }

        }catch(err){
           // console.log(err);
            setError(true);
            setLoading(false)
        }
    }

  

    return (
        <>
            <div className="register">
            
            <span className="registerTitle">Registration</span>

            {loading && <div className='loading'><img src="/images/loading.svg" alt="loading" /></div>}
           
                <form className="registerForm" onSubmit={handleChange}>
                    <label>Username</label>
                    <input className="registerInput" type="text" placeholder="Enter Your Username" autoComplete="new-password" onChange={(e)=> setUsername(e.target.value)} value={username} required/>
                    <label>E-mail</label>
                    <input className="registerInput" type="email" placeholder="Enter Your E-mail" autoComplete="new-password" onChange={(e)=> setEmail(e.target.value)} value={email} required/>
                    <label>Password</label>
                    <input className="registerInput" type="password" placeholder="Enter Your Password" autoComplete="new-password" onChange={(e)=> setPassword(e.target.value)} value={password} required />
                    <button className="registerButton" type='submit'>Register</button>
                </form>
                <button className="registerLoginButton">
                <Link className="link" to='/login'>Login</Link>
                </button>
                {error && <span style={{color: 'red'}}>Someting Went Wrong Choose Unique User Name & E-mail</span>}
            </div>

        </>
    )
}

export default Register;