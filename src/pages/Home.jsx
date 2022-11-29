import React, { useEffect } from 'react'
import hero from '../assets/images/nature.jpg'
import Blogcard from '../components/Blogcard'
import Sidebar from '../components/Sidebar'
import { useSelector,useDispatch } from 'react-redux';
import { getPost } from '../features/post/postSlice';


const Home = () => {
  const {isLoading,posts,post_id} = useSelector(store=>store.post)

 const dispatch = useDispatch() 
  useEffect(()=>{
     dispatch(getPost());
  },[])
  
  //  if(isLoading){
  //   return <h1> Loading......</h1>
  //  }


  return (
    <main>
        <div className='hero-section'>
         <img src={hero} alt=""  className='hero-img'/>
         <div className="hero-text">
            <h4>React & Laravel</h4>
            <h1>BLOG</h1>
         </div>
      </div>
        
       
      
      <div className="article-center">
      
        <Blogcard posts={posts} isLoading={isLoading} post_id={post_id}  />
        <Sidebar />
      </div>
    </main>
     
  )
}

export default Home