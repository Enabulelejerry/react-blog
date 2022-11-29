import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import { logoutUser } from '../features/user/userSlice'


const ProctectedRoute = ({children}) => {
    const {user,loggedOut} = useSelector((store)=>store.user)

    if(!user){
        toast.success('logout successfully');
        return <Navigate to ='/' />    
    }

   
    return children
}

export default ProctectedRoute