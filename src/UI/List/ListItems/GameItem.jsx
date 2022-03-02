import React from 'react';
import classes from "./ChatItem.module.css";
import PostAuthor from "../../Post/PostAuthor";
import ImgService from "../../../API/ImgService";

const GameItem = ({gameId, userLogin, userName, click}) => {
    return (
        <div className={classes.ChatItem} onClick={(e) => {click(e,gameId) }}>
            <div className={classes.d0}>
                <PostAuthor Name={userName} src={ImgService.GetProfileImgByLogin(userLogin)}/>
            </div>
        </div>
    );
};

export default GameItem;