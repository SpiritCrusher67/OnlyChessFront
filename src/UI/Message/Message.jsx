import React from 'react';
import SmallProfileImg from "../Img/SmallProfileImg";
import classes from "./Message.module.css"
import {FaCheck, FaTimes, FaUserPlus} from 'react-icons/fa';
import InviteService from "../../API/InviteService";
import {useNavigate} from "react-router-dom";
import MessageService from "../../API/MessageService";

const Message = ({msgId, isMy, text, time, senderImgSrc, msgType= 0} ) => {
    const navigate = useNavigate();

    switch (msgType){
        case 0:
            return <li className={[classes.msg, isMy ? classes.msgMy : classes.msgFr].join(' ')}>
                <SmallProfileImg imgSrc={senderImgSrc}/>
                <div className={classes.msgWrap}>
                    <div className={classes.msgText}>
                        {text}
                    </div>
                    <div className={classes.msgTime}>
                        {time}
                    </div>
                </div>
             </li>
        case 1:
            return <li className={[classes.msg, isMy ? classes.msgMy : classes.msgFr].join(' ')}>
            <SmallProfileImg imgSrc={senderImgSrc}/>
                <div className={classes.msgWrap}>
                    {
                        isMy
                        ?<div className={classes.msgText}>
                            <p>Вы отправили приглашение в друзья</p>
                            <div className={classes.iconDiv}><FaUserPlus/></div>
                        </div>
                        :<div className={classes.msgText}>
                            <p>Приглашение в друзья</p>
                            <button className={classes.inviteAccept}  onClick={async () => await InviteService.AcceptInviteToFriends(msgId)}><FaCheck/></button>
                            <button className={classes.inviteDenied}  onClick={async () => await InviteService.DecideInviteToFriends(msgId)}><FaTimes/></button>
                        </div>
                    }
                    <div className={classes.msgTime}>
                        {time}
                    </div>
                </div>
            </li>
        case 2:
            return <li className={[classes.msg, isMy ? classes.msgMy : classes.msgFr].join(' ')}>
                <SmallProfileImg imgSrc={senderImgSrc}/>
                <div className={classes.msgWrap}>
                    {
                        isMy
                            ?<div className={classes.msgText}>
                                <p>Вы отправили приглашение в игру</p>
                                <button className={classes.inviteDenied}  onClick={async () => await MessageService.DeleteMessage(msgId)}><FaTimes/></button>
                            </div>
                            :<div className={classes.msgText}>
                                <p>Приглашение в игру</p>
                                <button className={classes.inviteAccept}  onClick={async () => {
                                    await MessageService.DeleteMessage(msgId)
                                    navigate("/game/" + text)
                                } }><FaCheck/></button>
                                <button className={classes.inviteDenied}  onClick={async () => await MessageService.DeleteMessage(msgId)}><FaTimes/></button>
                            </div>
                    }
                    <div className={classes.msgTime}>
                        {time}
                    </div>
                </div>
            </li>
    }

};

export default Message;