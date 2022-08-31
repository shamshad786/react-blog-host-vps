import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import './Write.css';



const Write = ()=>{

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    const {user} = useContext(Context);

    console.log('user: ', user)

    const handleChange = async(e) =>{
        
        e.preventDefault();

        const newPost = {
            title,
            desc,
            username: user.username
        }
        
        console.log('newPost: ', newPost);


            if(file){

                const config = {
                    headers: { 'content-type': 'multipart/form-data' },
                    onUploadProgress: (event) => {
                      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
                    //  setProgress( Math.round((event.loaded * 100) / event.total));
                     
                    },
                  };

                const data = new FormData();
                const filename =  Date.now() + file.name;

                //console.log('file name: ', filename)
               // console.log('fileName: ', file.name);

                data.append('name', filename);
                data.append('file', file);
                newPost.photo = filename;

                try{

                 await axios.post('/upload', data, config);
                    
                }catch(err){
                    console.log("Photo Upload error: ", err);
                }
            }

           try{

            const res = await axios.post('/posts', newPost);

            console.log(res.data)

            window.location.replace("/post/" + res.data.response._id);

           }catch(err){

            console.log('post response error: ', err);
           }


    };


    return(
        <>
            <div className='write'>

            {file && (
            <img className="writeImg" src = {URL.createObjectURL(file)} alt="postImg"/>
            )}
                <form className='writeForm' onSubmit={handleChange}>
                    <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=> setFile(e.target.files[0])}/>
                        <input type='text' placeholder="Title" className="writeInput" autoFocus={true} onChange={(e)=>setTitle(e.target.value)}  />
                    </div>
                    <div className="writeFormGroup">
                        <textarea type="text" placeholder="Tell Your Story..." className="writeInput writeText" onChange={(e)=> setDesc(e.target.value)}></textarea>
                    </div>
                    <button className="writeSubmit" type='submit'>Publish</button> 
                </form>
            </div>
        </>
    )
}

export default Write;