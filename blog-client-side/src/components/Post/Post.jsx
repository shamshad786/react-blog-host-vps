import './Post.css';
import {Link} from 'react-router-dom';


const Post = ({post}) => {

  const PublicFolder =  "http://localhost:5001/images/"

    return(
        <>
        <div className="post">

        {post.photo && (

           <img className="postImg" src={PublicFolder + post.photo} alt="post"/>

        )}

        <div className="postInfo">
            <div className="postCats">
            {post.categories.map(c=>(
                <span className="postCat">{c.name}</span>
            ))}
              
            </div>
            <span className="postTitle">
               <Link className="link" to={`/post/${post._id}`}>{post.title}</Link>
            </span>
            <hr/>
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">
       {post.desc}
        </p>
        </div>
        </>
    )
}
 

export default Post;