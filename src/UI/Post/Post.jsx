import React, {useEffect, useState} from 'react';
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import classes from "./Post.module.css"
import ImgService from "../../API/ImgService";

const Post = ({authorLogin, author, isAuthorOnline, title, text, tagsArr, timeAgo, commentsCount, likesCount, isLiked, id}) => {
    const [img, setImg] = useState();

    useEffect(async () =>{
        setImg(await ImgService.GetPostImgById(id))
    }, [])

    return (
        <div className={classes.PostContainer}>
            <PostHeader authorName={author} imgSrc={img} authorLogin={authorLogin} isAuthorOnline={isAuthorOnline}/>
            <PostBody title={title} text={text} tags={tagsArr}/>
            <PostFooter timeAgo={timeAgo} commentsCount={commentsCount} likesCount={likesCount} isLiked={isLiked} postId={id}/>
        </div>
    );
};

export default Post;