 import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
 import { toast } from "react-toastify";
 import customFetch from "../../utils/axios";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";

 const initialState ={
    isLoading:false,
    loggedOut:true,
    user:getUserFromLocalStorage(),
    new_user:getUserFromLocalStorage()
 }


 export const registerUser = createAsyncThunk(
  'user/registerUser',
  async(user,thunkAPI) =>{
    try {
        const resp = await customFetch.post('/register',user)
        return resp.data
    } catch (error) {
        const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
 );



 export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(user,thunkAPI) =>{
        try {
            const resp = await customFetch.post('/login',user)
            return  resp.data
        } catch (error) {
            //   const message = error.response.data
            const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
 )

 export const updateUser = createAsyncThunk(
  'user/updateUser',
  async(user,thunkAPI) =>{
      try {
          const resp = await customFetch.post('/user/update',user,{
            headers: {
              Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            },
          });
           return  resp.data
         
      } catch (error) {
        console.log(error)
          //   const message = error.response.data
          const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
)


export const deleteUser = createAsyncThunk(
  'user/deleteuser',
  async(user,thunkAPI) =>{
      try {
          const resp = await customFetch.post('/user/delete',user,{
            headers: {
              Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            },
          });
           return  resp.data
      } catch (error) {
          console.log(error)
          const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
)



 const userSlice = createSlice({
    name:'user',
    initialState,

    reducers:{
      logoutUser:(state,{payload}) =>{
        state.user = null;
        state.new_user = null;
        removeUserFromLocalStorage();
        state.loggedOut=true
        if(!state.user || !state.new_user ){
          toast.success('Logout Successfully')
          // return <Navigate to='/' />
        }
        
      }
    },

    extraReducers:{
      [registerUser.pending]:(state)=>{
        state.isLoading = true;
      },

      [registerUser.fulfilled]:(state,{payload})=>{
          if (payload.user) {
            console.log("Success");
            const { user } =  payload;
            let userData = {...user}
            userData.token = payload.token
            state.isLoading = false;
            state.loggedOut=false;
            state.user = addUserToLocalStorage(userData);
            state.new_user = addUserToLocalStorage(userData);
        }
        if (payload.errors) {
            console.log(payload.errors);
            if(payload.errors.email){
                toast.error(payload.errors.email[0]);
            }
            if(payload.errors.password){
                toast.error(payload.errors.password[0]);
            }
            
        }
      },
       
      [registerUser.rejected]:(state,{payload})=>{
        state.isLoading = false;
        toast.error(payload);
      },


      [loginUser.pending]:(state)=>{
        state.isLoading = true;
      },

      [loginUser.fulfilled]:(state,{payload})=>{
        
          if (payload.user) {
            console.log(payload);
            const { user } =  payload;
            let userData = {...user}
            userData.token = payload.token
            state.isLoading = false;
            state.loggedOut=false;
            state.user = addUserToLocalStorage(userData);
            state.new_user = addUserToLocalStorage(userData);
            toast.success(`Hello There ${userData.name}`);
        }
     
      },
       
      [loginUser.rejected]:(state,{payload})=>{
        console.log(payload);
        state.isLoading = false;
        toast.error(payload.error);
      },




      [updateUser.pending]:(state)=>{
        state.isLoading = true;
      },

      [updateUser.fulfilled]:(state,{payload})=>{
        
          if (payload.user) {
            console.log(payload);
            const { user } =  payload;
            let userData = {...user}
            userData.token = payload.token
            state.isLoading = false;
            state.loggedOut=false;
            state.user = addUserToLocalStorage(userData);
            state.new_user = addUserToLocalStorage(userData);
            toast.success(`User details updated successfully`);
        }
     
      },
       
      [updateUser.rejected]:(state,{payload})=>{
        console.log(payload);
        state.isLoading = false;
        toast.error(payload.error);
      },



      [deleteUser.pending]:(state)=>{
        state.isLoading = true;
      },

      [deleteUser.fulfilled]:(state)=>{
         
            state.isLoading = false;
            state.loggedOut=false;
            state.user = removeUserFromLocalStorage()
            state.new_user = removeUserFromLocalStorage();
           
      },
       
      [deleteUser.rejected]:(state,{payload})=>{
        console.log(payload);
        state.isLoading = false;
        toast.error(payload.error);
      }
      
    }
   
 })




 export const {logoutUser} = userSlice.actions;
 export default userSlice.reducer