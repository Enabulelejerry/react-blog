import React, { useEffect } from 'react'
import {toast} from 'react-toastify'
import { useState } from 'react'

import {useSelector,useDispatch} from 'react-redux';
import { loginUser,registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';



const initialState ={

  name:'',
  email:'',
  password:'',
  isMember:true
}

const Login = () => {

 

const [values,setValues] = useState(initialState); 
const {isLoading,user} = useSelector(store=>store.user)
const dispatch = useDispatch();
const navigate = useNavigate()
const toogleMember = () =>{
  setValues({...values,isMember: !values.isMember})
}

const handleChange = (e) =>{
  const name = e.target.name;
  const value = e.target.value;
  setValues({...values,[name]:value})
  // console.log(`${name}:${value}`)
}

const onSubmit = (e) =>{
  e.preventDefault();
   const {name, email,password,isMember} = values
   if(!email || !password || (!isMember && !name) ){
    toast.error('Please fill out All Fields');
    return
   }
   if(isMember){
    dispatch(loginUser({email,password}))
    return;
   }

   dispatch(registerUser({name,email,password}))
}
  
useEffect(()=>{
  // console.log(user);
  if(user){
    navigate('/')
  }
},[user,navigate])
  

  return (
    <section className="login-section">
        <div className="section-title">
            <h2>{values.isMember ? 'Login' : 'Register'}</h2>
        </div>
        <div className="section-center login-center">
        
              <form action="" className='login-form' onSubmit={onSubmit}>
                {!values.isMember &&
                  <input type="text" name='name' value={values.name} className='form-control' placeholder='Enter Name' onChange={handleChange} />
                }
                 <input type="email" name='email' value={values.email} className='form-control' placeholder='Enter Email' onChange={handleChange} />
                 <input type="password" name='password' value={values.password} className='form-control' placeholder='Enter Password' onChange={handleChange} />
                  <button className='btn btn-login'>
                    {values.isMember ? 'SignIn' : 'SignUp'}
                  </button>
                  <div className='sign-container'>
                  <p> {values.isMember ? 'Do not have account yet?' : 'Already have an account ?'} </p> 
                  <span onClick={toogleMember}> {values.isMember ? 'SignUp' : 'SignIn '}</span>
                  </div>
                  
              </form>
               
        </div>
    </section>
  )
}

export default Login