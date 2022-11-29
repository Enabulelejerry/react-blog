import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import userimage from '../assets/images/user.jpg'
import  {FaUserCircle} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { deleteUser, updateUser } from '../features/user/userSlice';




const Updateuser = () => {
   const {isLoading,user} = useSelector(store=>store.user)
   const dispatch = useDispatch();
   const [userData,setUserData] = useState({
      name:user?.name || '',
      email:user?.email || '',
      password:user?.password || '',

   })

   const handleSubmit = (e) =>{
      e.preventDefault();
      const {name,email,password} = userData
      if(!name || !email ){
         toast.error('please fill out all fields')
         return;
      }
      dispatch(updateUser(userData));
   }

   const handleChange = (e) =>{
     const name = e.target.name
      const value = e.target.value
      setUserData({...userData,[name]:value})
   }

  const deletedUser = (e) => {
   dispatch(deleteUser())
   console.log('deleted User')
  }


  return <main>
     <div className="section update-section">
        <div className="section-center update-section">
              <div className='update-container'>
                  <div className='title-container'>
                     <a href="#"><h3>Update Account</h3></a>
                     <span onClick={deletedUser}><h5>Delete Account</h5></span>
                  </div>
                  <div className='update-profile-img'>
                     <img src={userimage} alt="" />
                     <div className='user-icon'>
                       <FaUserCircle color='white' />
                     </div>
                  </div>
                <form action="" className='user-form' onSubmit={handleSubmit}>
                 <input type="text" name='name' value={userData.name} className='form-control' placeholder='username' onChange={handleChange} />
                 <input type="email" name='email' value={userData.email} className='form-control' placeholder='Email' onChange={handleChange} />
                 <input type="password" name='password' value={userData.password} className='form-control' placeholder='Password' onChange={handleChange} />
                  <button className='btn btn-user'>
                    Update
                  </button>
               
                  
              </form>
              </div>
              <Sidebar />
        </div>

     </div>
  </main>
}

export default Updateuser