import React, {useContext, useEffect, useState} from 'react';
import SideBar from "../UI/SideBar/SideBar";
import ChatList from "../UI/List/ChatList";
import MessageInput from "../UI/Input/MessageInput";
import Message from "../UI/Message/Message";
import classes from "./ChatPage.module.css"
import MessageService from "../API/MessageService";
import ImgService from "../API/ImgService";
import {useParams} from "react-router-dom";
import {AuthContext} from "../Context/Contextes";

const ChatPage = () => {
    const {currentUserId, hubConnection, newMsgChats, setNewMsgChats} = useContext(AuthContext);
    const [chatList, setChatList] = useState([]);
    const [msgText, setMsgText] = useState("");
    const [currentChat, setCurrentChat] = useState(0);
    const [currentMsgList, setCurrentMsgList] = useState([]);
    const {login} = useParams();

    useEffect(async ()=>{
        setCurrentMsgList(await MessageService.GetMessagesByChatId(currentChat))
    }, [currentChat])

    useEffect(async () => {
        let chats = await MessageService.GetChatList();
        setChatList(chats);
        let chat;

        if(login){
            let chatId = await MessageService.GetChatByUserLogin(login);
            chat = await MessageService.GetMessagesByChatId(chatId);
            setCurrentChat(chatId);
        }
        else {
            chat = await MessageService.GetMessagesByChatId(chats[0].Id)
            setCurrentChat(chats[0].Id);
        }
        setCurrentMsgList(chat);
    },[])

    const sendMsgs = async (e) => {
        e.preventDefault();

        await MessageService.SendMessage(currentChat,msgText);
        setMsgText('');
    }


    const loadMsgs = async (id) => {
        let messages = await MessageService.GetMessagesByChatId(id)
        setCurrentMsgList(messages)
        setCurrentChat(id);
    };

    return (
        <div>
            <SideBar>
                <ChatList chats={chatList} loadMsgsFunc={loadMsgs}/>
            </SideBar>
            <div className={classes.ChatContainer}>
                <ul>
                    { currentMsgList.map(msg =>
                    <Message
                        msgType={msg.Type}
                        msgId={msg.Id}
                        key={msg.Id}
                        senderImgSrc={ImgService.GetProfileImgByLogin(msg.UserLogin)}
                        text={msg.Text}
                        time={msg.Time}
                        isMy={msg.UserLogin.trim() == currentUserId.trim()}
                    />)}
                </ul>
                <MessageInput text={msgText} setText={setMsgText} btnAction={sendMsgs}/>
            </div>
        </div>
    );
};

export default ChatPage;