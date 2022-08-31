 import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';


const Sidebar  = () => {

    const [cats, setCats] = useState([]);

    
    useEffect(()=>{
                const getCats =  async()=>{
                const res = await axios.get('/categories');
                setCats(res.data.response)
            }
            getCats();
    },[])

  //  console.log('Category: ',cats)

    return(
        <>

        <div className="Sidebar">
            <div className="sidebarItem">
                <span className="SidebarTitle">ABOUT ME</span>
                <img className ='SidebarImg' src="https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="blogPic"/>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>           
            </div>
            <div className="sidebarItem">
            <span className="SidebarTitle">CATEGORIES</span>
            
            <ul className="sidebarList">
               {cats?.map(c => (
                <Link className='link' to={`/?catName=${c.name}`}>
                <li className="sidebarListItem">{c.name}</li>
                </Link>
               ))}
               
            </ul>
            </div>
            <div className="sidebarItem">
            <span className="SidebarTitle">FOLLOW US</span>
            <div className='sidebarSocial'>
            <i className=" sidebarIcon fab fa-facebook-square"></i>
           <i className=" sidebarIcon fab fa-twitter-square"></i>
           <i className=" sidebarIcon fab fa-pinterest-square"></i>
           <i className=" sidebarIcon fab fa-whatsapp-square"></i>
            </div>
            </div>
        </div>

        </>
    )
}

export default Sidebar;