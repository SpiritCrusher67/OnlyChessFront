import React, {useState} from 'react';
import classes from "./PostFooter.module.css"
import { FaRegHeart, FaComment, FaHeart } from 'react-icons/fa';
import PostService from "../../API/PostService";

const PostFooter = ({timeAgo, commentsCount, likesCount, isLiked, postId}) => {
    const [liked, setLiked] = useState(isLiked === 0);
    const [likes, setLikes] = useState(likesCount);

    const setLike = async (e) =>{
        e.preventDefault();

        await  PostService.SetLike(postId);
        setLikes(likes + 1)
        setLiked(true);
    }
    const removeLike = async (e) =>{
        e.preventDefault();

        await PostService.RemoveLike(postId);
        setLikes(likes - 1)
        setLiked(false);
    }

    return (
        <div className={classes.PostFooter}>
            <ul>
                <li className={classes.PublishedDate}>{new Date(timeAgo).toLocaleDateString(undefined, {year: '2-digit', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric'})}</li>
                <li className={classes.Comments}>
                    <button disabled={true}><FaComment/><span>{commentsCount}</span></button>
                </li>
                <li>
                    {
                        liked === true
                            ? <button onClick={removeLike}><FaHeart/><span>{likes}</span></button>
                            : <button onClick={setLike}><FaRegHeart/><span>{likes}</span></button>
                    }
                </li>
            </ul>
        </div>
    );
};

export default PostFooter;