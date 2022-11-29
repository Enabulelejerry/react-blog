import React from 'react'
import {AiFillFacebook} from 'react-icons/ai'
import {FaInstagramSquare} from 'react-icons/fa'
import {AiFillTwitterSquare} from 'react-icons/ai'
import user_img from '../assets/images/user.jpg'
import { useSelector,useDispatch } from 'react-redux'
import { logoutUser } from '../features/user/userSlice'
import { Navigate } from 'react-router-dom'




const Navigation = () => {
   const {user} = useSelector((store)=>store.user)
   const dispatch = useDispatch();
  const logout = () =>{
      dispatch(logoutUser())
       
   }
   
  return (
     <div className="navigation">
        <div className='social-links'>
            <AiFillFacebook className='social-icons'/>
            <AiFillTwitterSquare className='social-icons'/>
            <FaInstagramSquare className='social-icons'/>
        </div>
         <ul className='links'>
            <li><a href="/" className='link'>Home</a></li>
            <li><a href="" className='link'>About Us</a></li>
            
            
            {user ? (<><li><a href="/write" className='link'>Write</a></li> 
            <button  className='btn logout-btn' onClick={logout}>Logout</button></>
            )
            
                

            : 
            <li><a href="/login" className='link' >Login</a></li>
            }
            
         </ul>
         {user ? 
          <div className="nav-pic">
          <a href="/update/user">
          <img src={user_img} alt="" className='nav-img' />
          </a>
             
         </div>:''
      }
       
     </div>
  )
}

export default Navigation