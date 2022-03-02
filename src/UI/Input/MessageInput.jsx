import React from 'react';
import {FaArrowRight} from "react-icons/fa";
import classes from "./MessageInput.module.css"

const MessageInput = ({text, setText, btnAction}) => {
    return (
        <div className={classes.MsgInput}>
            <input value={text} onChange= {(e) =>{setText(e.target.value)}} placeholder="Сообщение"></input>
            <button onClick={btnAction}><FaArrowRight/></button>
        </div>
    );
};

export default MessageInput;