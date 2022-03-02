import React, {useContext, useEffect, useState} from 'react';
import classes from "./ChatItem.module.css";
import PostAuthor from "../../Post/PostAuthor";
import ImgService from "../../../API/ImgService";
import {FaEnvelope} from "react-icons/fa";
import {AuthContext} from "../../../Context/Contextes";

const ChatItem = ({id, name, login, isUserOnline, func}) => {
    const [hasNewMessage, setHasNewMessage] = useState(false)
    const {currentUserId, newMsgChats, setNewMsgChats} = useContext(AuthContext);

    useEffect(()=>{
        if(newMsgChats.includes(id))
            setHasNewMessage(true)
        else
            setHasNewMessage(false)
    },[newMsgChats])

    let click = async (e) => {
        e.preventDefault();

        setNewMsgChats(oldArray => oldArray.filter((e)=> e != id))

        await func(id);
    }

    return (
        <div className={classes.ChatItem} onClick={click}>
            <div className={classes.d0}>
                <PostAuthor Name={name} src={ImgService.GetProfileImgByLogin(login)} isOnline={isUserOnline}/>
            </div>
            <div className={classes.d1}/>
            <div>
                {hasNewMessage
                    ? <p><FaEnvelope/></p>
                    : <p></p>
                }
            </div>
        </div>
    );
};

export default ChatItem;