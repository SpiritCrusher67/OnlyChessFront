import React from 'react';
import classes from "./PostBody.module.css"

const PostBody = ({title, text, tags}) => {
    let tagsArr = tags.split(',');
    return (
        <div className={classes.PostBody}>
            <div className={classes.PostTitle}>
                <h1><a href="#">{title}</a></h1>
            </div>
            <div className={classes.PostSummary}>
                <p>{text}</p>
            </div>
            <div className={classes.PostTags}>
                <ul>
                    {tagsArr.map(
                        tag =>
                            <li><a href="#" >{tag}</a></li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PostBody;