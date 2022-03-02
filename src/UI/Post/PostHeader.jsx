import React, {useEffect, useState} from 'react';
import PostAuthor from "./PostAuthor";
import classes from "./PostHeader.module.css"
import ImgService from "../../API/ImgService";

const PostHeader =({authorLogin ,authorName, imgSrc, isAuthorOnline}) => {

    const [img, setImg] = useState();

    useEffect(async () => {
        setImg(await ImgService.GetProfileImgByLogin(authorLogin.trim()))
    }, [])

    return (imgSrc
            ?
            <div className={classes.PostHeader}>
                <img className={classes.PostCover} src={imgSrc}/>
                <div className={classes.AuthorContainer}>
                    <PostAuthor Name={authorName} IsNoCover={false}  src={img} isOnline={isAuthorOnline}/>
                </div>
            </div>
            :
            <div className={classes.PostHeader}>
                <div className={classes.AuthorContainerNoCover}>
                    <PostAuthor Name={authorName} IsNoCover={true} src={img} isOnline={isAuthorOnline}/>
                </div>
            </div>
    );
};

export default PostHeader;