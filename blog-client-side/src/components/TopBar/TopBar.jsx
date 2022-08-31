import './TopBar.css';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';


const TopBar = () => {

   const {user, dispatch} =  useContext(Context);

   const handleLogout = ()=>{
       
            dispatch({type: "LOGOUT"});
   }
 
   const PublicFolder =  "http://localhost:5001/images/"

    return (
        <>
          <div className="top">
           <div className="topLeft">
           <i className=" topIcon fab fa-facebook-square"></i>
           <i className=" topIcon fab fa-twitter-square"></i>
           <i className=" topIcon fab fa-pinterest-square"></i>
           <i className=" topIcon fab fa-whatsapp-square"></i>
           
           </div>

           <div className="topCenter">
               <ul className="topList">
                <li className="topListItems">
                    <Link className="link" to="/">HOME</Link>
                </li>
                <li className="topListItems">
                <Link className="link" to="/">ABOUT</Link>
                </li>
                <li className="topListItems">
                <Link className="link" to="/">CONTACT</Link>
                </li>
                <li className="topListItems">
                <Link className="link" to="/write">WRITE</Link>
                </li>
                <li className="topListItems" onClick={handleLogout}>{user && "LOGOUT"}</li>
               </ul>
           </div>
           <div className="topRight">
           {user ? (
               <Link to='/settings'><img className="topImg" src={PublicFolder+user.profilePicture} alt="Profile" /></Link>
           ): (
            <ul className="topList">
            
            <li className="topListItems">
                    <Link className="link" to="/login">LOGIN</Link>
            </li>

            <li className="topListItems">
                    <Link className="link" to="/register">REGISTER</Link>
                </li>
                

            </ul>
           )
           
           }
              
               <i className=" topSearchIcon fas fa-search"></i>
           </div>

          </div>  
        </>
    )
}


export default TopBar;