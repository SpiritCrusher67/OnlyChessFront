import React, {useContext, useEffect, useState} from 'react';
import classes from "./GameConsole.module.css"
import MessageInput from "../Input/MessageInput";
import {GameConnectionContext} from "../../Context/Contextes";

const GameConsole = () => {
    const {gameConnection, gameId} = useContext(GameConnectionContext)
    const [msgList, setMsgList] = useState([])
    const [msgText, setMsgText] = useState("")

    let sendMsg = async (e) =>{
        e.preventDefault()
        if (msgText != "" & gameId != undefined)
            await gameConnection.invoke("SendMessage", msgText, gameId)
        setMsgText("")
    }

    useEffect(() => {
        if (gameConnection != undefined)
        {

            gameConnection.on("ReceiveMessage", async (msg, sender) =>{
                if(sender)
                    setMsgList(oldArray => [...oldArray, <p><span>{sender}:</span>{msg}</p>])
                else
                    setMsgList(oldArray => [...oldArray, <p>{msg}</p>])

            })
        }
    }, [gameConnection])

    return (
        <div>
            <div className={classes.console}>
                {msgList}
            </div>
            <MessageInput text={msgText} setText={setMsgText} btnAction={sendMsg}/>
        </div>
    );
};

export default GameConsole;