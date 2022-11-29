import React, { useRef, useState } from 'react'
import nature from '../assets/images/nature.jpg'
import { Editor } from "@tinymce/tinymce-react";
import { useSelector,useDispatch } from 'react-redux';
import { createPost, handleChange, handleFileChange, updatePost,clearValues } from '../features/post/postSlice';
import { toast } from 'react-toastify';

const Write = () => {
  const [selectedFile, setSelectedFile] = useState({})
  const[selectedImage, setSelectedImage] = useState('');
  let imageRef = useRef()
  const {
    title,
    desc,
    image,
    post_id,
    isEditing,
  } = useSelector((store)=>store.post);
  const dispatch = useDispatch();

  const handlePostInput = (e) => {
    const name  = e.target.name;
    let value = e.target.value;
    if(name == 'image'){
      const imageFile = e.target.files[0];
      value = URL.createObjectURL(imageFile)
      setSelectedFile(imageFile)
      setSelectedImage(URL.createObjectURL(imageFile));
    }
    dispatch(handleChange({name, value}))
  }

  const clear = () =>{
    dispatch(clearValues());
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(title.length === 0 || desc.length=== 0 || image.length === 0){
      toast.error('please fill out all fields')
      return
    }

    if(isEditing){
      dispatch(updatePost({post_id,post:{title,desc,selectedFile}}))
      return
    }

    dispatch(createPost({title,desc,selectedFile}))
  }
 



  return <main>
      <div className="section write-section">
         <div className="section-center write-center">
              <img src={nature} alt="" className='about-img' />

              <form action="" className='form' onSubmit={handleSubmit}>

                 <input type="text" name='title' value={title} className='form-control' placeholder='Title' onChange={handlePostInput} />

                <textarea name="desc" id="" cols="30" rows="10" style={{ marginBottom:'2rem' }} onChange={handlePostInput} value={desc}></textarea>

                {/* <Editor
                    init={{
                    height: 200,
                    menubar: false
                    }}
                    name='desc'
                   
                 /> */}

                

                  <label className='btn btn-img' 
                    style={{ marginBottom: '1rem', textAlign: 'center' }}
                    onClick={() => imageRef.current.click()}
                    >
                    Choose image
                  </label>
                 <input 
                    ref={imageRef}
                    type="file" 
                    name='image' 
                    value='' className='form-control' style={{ marginTop:'2rem', display: 'none' }} onChange={handlePostInput}  />
                    {selectedFile &&  <div className='write-img-con'>
                     <img src={image} alt="" />
                    </div>}
                    
                 {/* <label htmlFor="imageName">  {selectedFile && selectedFile.name} </label> */}
                  <button className='btn btn-user'>
                    {isEditing ? 'Update' : 'Publish'}
                  </button>

                  
              </form>

              <button className='btn btn-user' style={{ marginTop:'2rem' }} onClick={clear} >
                    Clear Entries
              </button>
         </div>
      </div>
  </main>
}

export default Write