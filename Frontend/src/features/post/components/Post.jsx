import React from 'react'

const Post = ({ post }) => {
  const user = post.users;

  return (
    <div className="posts">
      <div className="user">
        <img src={user.profileImage} alt="" />
        <p>{user.username}</p>
      </div>

      <img src={post.imgUrl} alt="" />

      <div className="icons">
        <div className="left">
          <button><i className="ri-heart-fill"></i></button>
          <button><i className="ri-chat-3-line"></i></button>
          <button><i className="ri-send-plane-line"></i></button>
        </div>
      </div>

      <div className="bottom">
        <p className="caption">{post.caption}</p>
      </div>
    </div>
  )
}

export default Post