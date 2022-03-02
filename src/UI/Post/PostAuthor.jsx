import React from 'react';
import classes from "./PostAuthor.module.css"
import SmallProfileImg from "../Img/SmallProfileImg";

const PostAuthor = ({Name, IsNoCover, src , isOnline}) => {
    return (
        <div className={IsNoCover ? classes.PostAuthorNoCover : classes.PostAuthor}>
            <SmallProfileImg imgSrc={src} isOnline={isOnline}/>
            <h3>{Name}</h3>
        </div>
    );
};

export default PostAuthor;