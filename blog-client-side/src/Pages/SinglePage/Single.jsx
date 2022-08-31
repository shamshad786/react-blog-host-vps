import './Single.css';
import Sidebar from  '../../components/SiderBar/Sidebar';
import SinglePost from '../../components/SinglePost/SinglePost';

const Single = () => {

    return(
        <>
            <div className="single">
                 <SinglePost/>
                 <Sidebar/>
            </div>
        </>
    )
}

export default Single;