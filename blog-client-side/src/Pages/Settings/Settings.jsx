import './Settings.css';
import Sidebar from  '../../components/SiderBar/Sidebar';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

const Settings = () => { 

    const {user} = useContext(Context);

    const [file, setFile]= useState(null);
    const [username , setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");

    const {dispatch, isFetching} = useContext(Context);

    const handleUpdate = async (e) =>{

        e.preventDefault();
        const updateUser = {
            userId: user._id,
            username,
            email,
            password, 
        }
        
        if(file){
            const data = new FormData(); 
            const fileName = Date.now() + file.name;            
            data.append('name', fileName);
            data.append('file', file);
            updateUser.profilePicture =  fileName;

            try{
                
                await axios.post('/upload', data)
                
            }catch(err){

                console.log('update user Error: ', err);
            }   
        }
        try{

       // const res =  await axios.put('/users/' + user._id, updateUser);

       const res = await axios.put(`/users/${user._id}`, updateUser)

        console.log('update response: ', res.data.response);
 
        if(res.data.status === 201){    

        dispatch({type: "LOGIN_SUCCESS", payload: res.data.response});
        setSuccess(res.data.message);
            console.log(res.data.response);
       }else{

           setSuccess("Internal Server error please logout & login again");
       }

        }catch(err){
            console.log("error user detail updatae: ", err);
        }

    };

    const PublicFolder =  "http://localhost:5001/images/"

    return (
        <>
            <div className="settings">
                <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleUpdate}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file? URL.createObjectURL(file) : PublicFolder + user.profilePicture} alt="profile"/>
                        <label htmlFor="fileInput">
                        <i className=" settingsPPicon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display: "none"}} onChange={(e)=> setFile(e.target.files[0])} />
                    </div>
                    <label>User Name</label>
                    <input type="text" placeholder={user.username}  autoComplete="new-password"  onChange={(e)=>setUsername(e.target.value)}/>
                    <label>User E-mail</label>
                    <input type="email" placeholder={user.email} autoComplete="new-password"  onChange={(e)=> setEmail(e.target.value)}/>
                    <label>User Password</label>
                    <input type="password" placeholder="password"   autoComplete="new-password" onChange={(e)=> setPassword(e.target.value)}/>
                    <button className="settingsSubmit" type='submit'  disabled={isFetching}>Update</button>
                    <span style={{color: 'green',marginTop: '10px', fontWeight: 'bold', textAlign:'center' }}>{success}</span>
                </form>

                </div>
                <Sidebar/>
            </div>
        </>
    ) 
}


export default Settings;