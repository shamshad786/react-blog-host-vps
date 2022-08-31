import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';

import './SinglePost.css';

const SinglePost = () => { 

    const  {user} =  useContext(Context);

    const location = useLocation();

    const path = location.pathname.split('/')[2]
    
    const [singlepost, setSinglePost ] = useState({});

    //! for update post

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file,setFile] = useState(null);
    const [updatemode, setUpdateMode] = useState(false);


//! fetch single post data

    useEffect(()=>{

        const getSinglePost = async()=>{

            const res =  await axios.get(`/posts/${path}`);
            
            console.log(res.data.response);
            setSinglePost(res.data.response);
            setTitle(res.data.response.title);
            setDesc(res.data.response.desc);
            setFile(res.data.response.photo)
        }
        getSinglePost();

    },[path])

    const PublicFolder =  "http://localhost:5001/images/"

    //! Delete single post
    const handleDelete = async() =>{
        
        try{
            await axios.delete('/posts/'+path, {data: {username: user.username}});
            window.location.replace('/');
        }catch(err){
            console.log('post delet error',err)
        }
    }
    //! Update single post 
       const handleUpdate = async() => {

           const updatePost = {
               title,
               desc,
               username: user.username
           }
           
        if(file){

            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            updatePost.photo = fileName;

            try{
                await axios.post('/upload',data);

            }catch(err){
                console.log('update file error: ', err);
            }
        }

        try{

            // await axios.put('/posts/'+path, {
            //     username: user.username,
            //      title,
            //     desc,
            // });

            await axios.put('/posts/'+path, updatePost)
                setUpdateMode(false)
            window.location.reload();
        }catch(err){
            console.log('update Error: ', err);
        }
       }


const updatemd = () =>{
    setUpdateMode(true)
    setFile(null)
}
    return (
        <>
            <div className="singlePost">
                <div className="singlePostWrapper">
                        {
                        updatemode ?
                        <>
                       <input type='file' onChange={(e)=> setFile(e.target.files[0])}/> 

                        {file && <img className="singlePostImg" src={URL.createObjectURL(file)} alt='file'/>}
                        </> 
                             : (
                          <img className="singlePostImg" src={PublicFolder + file} alt="scenery" />
                            ) } 

                    {updatemode ? (
                        <input type="text" value={title} autoFocus={true} className="singlePostTitleInput" onChange={(e)=> setTitle(e.target.value)}/>
                    ) : (

                <h1 className="singlePostTitle"> 
                {title}
                {singlepost.username === user?.username && (
                <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={updatemd}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                </div>
                )}
                </h1>
                )}
                <div className="singlePostInfo">
                <span className="singlePostAuthor">Author: 
                <Link className='link' to={`/?username=${singlepost.username}`}>
                 <b>{singlepost.username}</b> 
                 </Link>
                 </span>
                <span className="singlePostDate">{new Date(singlepost.createdAt).toDateString()}</span>
                </div>

                {updatemode ? (
                    <textarea className='singlePostDescInput' rows="10"  value={desc} onChange={(e)=> setDesc(e.target.value)}/>
                ) : (

                <p className="singlePostDesc">
                {desc}
                </p>
                )}

                    {
                        updatemode ? (<button className='singlePostUpdateButton' onClick={handleUpdate}>Update</button>) : ("")
                    }

            </div>
        </div>
        </>
    )
}


export default SinglePost;