import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import SideBar from '../../components/SiderBar/Sidebar';
import './Home.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Home = () => {

    const [post, setPost] = useState([]);

    const {search} = useLocation();
    
    console.log(search);

    useEffect(()=>{
            const fetchPost = async()=>{
            const res = await axios.get('/posts' + search);
            console.log(res.data.response);
            setPost(res.data.response)

            }

            fetchPost()
    },[search])


    return (   
        <>
             <Header/>
            <div className="home">
                <Posts posts={post}/>
                <SideBar/>
            </div>


        </>
    );
}


export default Home;