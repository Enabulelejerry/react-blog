import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { logoutUser } from "../user/userSlice";
// import { useDispatch } from "react-redux";
import customFetch from '../../utils/axios';
import { Navigate } from "react-router-dom";

const initialState =  {
    isLoading: false,
    isEditing: false,
    isSuccess: false,
    title: '',
    desc: '',
    image:'',
    posts:[],
    id:'',
    post_id:'',
    singlePost:''
};

export const createPost = createAsyncThunk(
    'create/post',
    async(post,thunkAPI) =>{
      try {
        const user_id = thunkAPI.getState().user.user.id
           const {title,desc,selectedFile} = post;
           const image = selectedFile
           const formData = new FormData();
           formData.append('user_id',user_id);
           formData.append('title',title);
           formData.append('desc',desc);
           formData.append('image',image);
          const resp = await customFetch.post('/add/post',formData,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
              },
          })
            
        //   console.log(resp.data.post)
           if(resp.data.post){
            thunkAPI.dispatch(clearValues());
           }
          return resp.data

      } catch (error) {
        console.log(error);
          const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          return thunkAPI.rejectWithValue(message);
      }
    }
   );


   export const getPost = createAsyncThunk(
    'get/post',
    async(_,thunkAPI) =>{
      try {
          const resp = await customFetch.get('/get/posts',{
          })
          return resp.data
      } catch (error) {
        console.log(error);
          const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          return thunkAPI.rejectWithValue(message);
      }
    }
   );

   export const getSinglePost = createAsyncThunk(
    'single/post',
    async(id,thunkAPI) =>{
      try {
        id = thunkAPI.getState().post.id
        const resp = await customFetch.get(`/single/post/${id}`)  
        console.log(resp.data);
        return resp.data
      } catch (error) {
        console.log(error);
          const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          return thunkAPI.rejectWithValue(message);
      }
    }
   );

// update single post
export const updatePost = createAsyncThunk(
    'update/post',
    async({post_id,post},thunkAPI) =>{
      try {
        const user_id = thunkAPI.getState().user.user.id
           const {title,desc,selectedFile} = post;
           const image = selectedFile
           const formData = new FormData();
           formData.append('user_id',user_id);
           formData.append('title',title);
           formData.append('desc',desc);
           formData.append('image',image);
          const resp = await customFetch.post(`/update/post/${post_id}`,formData,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
              },
          })
            
          console.log(resp.data.post)
           if(resp.data.post){
            thunkAPI.dispatch(clearValues());
           }
          return resp.data

      } catch (error) {
        console.log(error);
          const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          return thunkAPI.rejectWithValue(message);
      }
    }
   );

   // delete post

   export const deletePost = createAsyncThunk(
    'delete/post',
    async(payload,thunkAPI) =>{
      try {
           const{user_id,post_id} = payload;
           const logged_id = thunkAPI.getState().user.user.id
         
            if(user_id != logged_id){
              toast.error('Unauthorized Action')
              thunkAPI.dispatch(logoutUser());
               return
            }
  
          const resp = await customFetch.get(`/delete/post/${post_id}`)
          thunkAPI.dispatch(getPost())
          console.log(resp.data)
          return resp.data
      } catch (error) {
        console.log(error);
          const message = error.response.data || (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          return thunkAPI.rejectWithValue(message);
      }
    }
   );


const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        handleChange:(state, action) =>{
            const {payload:{name,value}} = action
            // console.log(value)
            state[name]=value;
        },
        showLoading:(state) =>{
          state.isLoading = true;
      },
      hideLoading:(state) =>{
          state.isLoading = false;
      },

        clearValues: () =>{
            return {...initialState,}
        },

        setEditId:(state,{payload})=>{
            return{...state,id:payload}
        },

        setEditPost:(state,{payload})=>{
            console.log(payload)
          return {...state,isEditing:true,...payload}
        },
        resetStatus: (state) => {
          state.isEditing = false
          state.isSuccess = false
          state.isLoading = false
        }

    },

    extraReducers:{
    
          [createPost.pending]:(state)=>{
          
            state.isLoading = true;
          },
    
          [createPost.fulfilled]:(state,{payload})=>{
            console.log(payload);
            if(payload.post){
                toast.success('post created successfully');
            }
            if(payload.errors){
                if(payload.errors.title){
                    toast.error(payload.errors.title[0]);
                }

                if(payload.errors.desc){
                    toast.error(payload.errors.desc[0]);
                }

                if(payload.errors.image){
                    toast.error(payload.errors.image[0]);
                }
            }
        
          },
           
          [createPost.rejected]:(state,{payload})=>{
            console.log(payload);
            state.isLoading = false;
            toast.error(payload.error);
          },

          [getPost.pending]:(state)=>{
            state.isLoading = true;
          },
    
          [getPost.fulfilled]:(state,{payload})=>{
            console.log(payload);
            // toast.success('post created successfully');
            state.isLoading = false
             state.posts  = payload.posts
          },
           
          [getPost.rejected]:(state,{payload})=>{
            console.log(payload);
            state.isLoading = false;
            toast.error(payload.error);
          },


          
          [getSinglePost.pending]:(state)=>{
            state.isLoading = true;
          },
    
          [getSinglePost.fulfilled]:(state,{payload})=>{
            console.log(payload);
            state.isLoading = false
             state.singlePost = payload.singlepost
          },
           
          [getSinglePost.rejected]:(state,{payload})=>{
            console.log(payload);
            state.isLoading = false;
            toast.error(payload.error);
          },

          //update post


          [updatePost.pending]:(state)=>{
            state.isLoading = true;
          },
    
          [updatePost.fulfilled]:(state,{payload})=>{
            console.log(payload);
            if(payload.post){
                toast.success('post update successfully');
                state.isEditing = false;
            }
            if(payload.errors){
                if(payload.errors.title){
                    toast.error(payload.errors.title[0]);
                }
                if(payload.errors.desc){
                    toast.error(payload.errors.desc[0]);
                }
                if(payload.errors.image){
                    toast.error(payload.errors.image[0]);
                }

              
            }

            if(payload.error){
              toast.error('Unauthorized Action');
              state.isEditing = false;
              clearValues()
          }
        
          },
           
          [updatePost.rejected]:(state,{payload})=>{
            console.log(payload);
            state.isLoading = false;
            toast.error(payload.error);
          },


          [deletePost.pending]:(state)=>{
            state.isLoading = true;
          },
    
          [deletePost.fulfilled]:(state,{payload})=>{
                toast.success('Post Deleted Successfully');
                state.isSuccess = true
                // return <Navigate to ='/' />  
          },
           
          [deletePost.rejected]:(state,{payload})=>{
            console.log(payload);
            state.isLoading = false;
            toast.error(payload.error);
          }

    
    
    }
})

export const {handleChange, handleFileChange,clearValues,setEditId,setEditPost, resetStatus} = postSlice.actions
export default postSlice.reducer