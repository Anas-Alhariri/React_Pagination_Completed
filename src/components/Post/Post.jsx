import React from 'react'
import './Post.scss'

const Post = ({ post }) => {
    return (
        <div className="post">
            <h4 className='post__id'>Post No: {post.id}</h4>
            <h1 className='post__title'>{post.title}</h1>
            <p className='post__content'>{post.body}</p>
        </div>
    )
}

export default Post
