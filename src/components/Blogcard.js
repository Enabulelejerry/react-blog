import React from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import blog1 from '../assets/images/blog-1.jpg'
import blog2 from '../assets/images/blog-2.jpg'
import blog3 from '../assets/images/blog-3.jpg'
import blog4 from '../assets/images/blog-4.jpg'
import blog5 from '../assets/images/blog-5.jpg'
import { setEditId } from '../features/post/postSlice';
import { useDispatch } from 'react-redux';

const Blogcard = ({posts, isLoading,post_id}) => {
    const dispatch = useDispatch();
    if(posts.length === 0){
        return <h1>No stories to display</h1>
    }
  return <div className="article-container">
    { isLoading ? <h2>Loading...</h2> :
        posts?.map((post)=>{
            const {id,title,desc,image,updated_at} = post
            return  <article key={id} className="single-article">
                        <img src={`${'http://127.0.0.1:8000/'}${image}`} alt=""  className='article-img'/>
                        <span>music</span>
                        <div className='article-info'>
                            <Link to="/single" onClick={()=>{
                                dispatch(setEditId(id))
                            }}><h3>{title}</h3></Link>
                        
                        <span> <Moment fromNow>{updated_at}</Moment>  </span>
                        <p>{desc.slice(0, 200)}...</p>
                        </div>
                </article>
           })
    }

</div>
    
  
}

export default Blogcard