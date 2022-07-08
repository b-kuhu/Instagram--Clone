import React from "react";
import './Post.css';
import { Avatar } from '@material-ui/core';


function Post({username,caption,imageURL}) {

    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt='ARYA'
                    src='av.png'
                />
                <h3>{username}</h3>
            </div>
            {/* header->avatar + username */}
            <img className="post_image"
                src={imageURL} alt="" />
            {/* post Image */}
            <h4 className="post_text"><strong>{username} </strong>{caption}</h4>
        </div>
    );

}
export default Post

 