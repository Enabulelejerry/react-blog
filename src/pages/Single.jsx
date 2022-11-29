import React, { useEffect, useState } from "react";
import hero from "../assets/images/nature.jpg";
import Moment from "react-moment";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getSinglePost, resetStatus } from "../features/post/postSlice";
import { setEditPost } from "../features/post/postSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Single = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { new_user } = useSelector((store) => store.user);
  const { isLoading, singlePost, isSuccess } = useSelector((store) => store.post);
  const [postData, setPostData] = useState({});
  const [editData, setEditData] = useState({});
  const [deleteData, setDeleteData] = useState({})


  // const { title,image,desc,user,updated_at,id } = singlePost[0]

  useEffect(() => {
    dispatch(getSinglePost());
  }, []);

  useEffect(() => {
    if (singlePost[0]) {
      console.log(singlePost[0]);
      setPostData(singlePost[0]);
      const { title, image, desc, user, updated_at, id } = singlePost[0];
      // const delete_id = id;
      setEditData({
        title: title,
        image: image,
        desc: desc,
        user: user,
        updated_at: updated_at,
        post_id: id,
      });

      setDeleteData({
        user_id: user.id,
        post_id:id,
      });
    }
  }, [singlePost]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/")
      dispatch(resetStatus())
    }
  },[isSuccess])
  return (
    <main>
      <section className="section">
        <div className="section-center single-center">
          <div className="single-container">
            <img
              src={`${"http://127.0.0.1:8000/"}${postData?.image}`}
              alt=""
              className="single-img"
            />
            <div className="single-title">
              <h3>{postData?.title}</h3>
              {new_user ? (
                <div className="btn-container">
                  <Link to='/write'>
                  <FiEdit color='red' className='edit' onClick={()=>dispatch(setEditPost(editData))} />
                  </Link>

                  <BiTrash color="green" className="trash" onClick={()=>dispatch(deletePost(deleteData))} />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="author-container">
              <p>
                Author: <span>{postData?.user?.name}</span>
              </p>
              <p>
                <Moment fromNow>{postData?.updated_at}</Moment>
              </p>
            </div>
            <p>{postData?.desc}</p>
          </div>

          <Sidebar />
        </div>
      </section>
    </main>
  );
};

export default Single;
