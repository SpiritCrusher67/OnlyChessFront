import React, {useContext, useState} from 'react';
import ProfileMainImg from "../Img/ProfileMainImg";
import BlueButton from "../Button/BlueButton";
import classes from "./Profile.module.css";
import SideBar from "../SideBar/SideBar";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../Context/Contextes";
import ProfileService from "../../API/ProfileService";
import MessageService from "../../API/MessageService";

const Profile = ({imgSrc, name, totalGames, totalWins, isMy,isFriend, userLogin, isOnline }) => {
    const navigate = useNavigate();
    const {setCurrentUserId, setToken, hubConnection} = useContext(AuthContext);

    let buttons;
    let logOut = () =>{
        setCurrentUserId(null);
        setToken(null);
        hubConnection.stop();
    }
    let removeFriend = async (e) =>{
        e.preventDefault();
        await ProfileService.RemoveFriend(userLogin);
    }

    let sendInvite = async (e) => {
        e.preventDefault();
        await MessageService.SendInviteToFriend(userLogin);
    }

    if (isMy === true){
        buttons =
            <div>
                <BlueButton onClick={() => navigate("/profile/createPost")}>Создать пост</BlueButton>
                <BlueButton onClick={logOut}>Выйти</BlueButton>
            </div>
    }
    else {
        buttons =
            <div>
                <BlueButton onClick={() => navigate("/chat/" + userLogin)}>Сообщение</BlueButton>
                {isFriend === true
                    ? <BlueButton onClick={removeFriend}>Удалить</BlueButton>
                    : <BlueButton onClick={sendInvite}>В друзья</BlueButton>
                }
            </div>
    }
    let onlineIndicator;
    if (isOnline)
        onlineIndicator =
            <p className={[classes.OnlineIndicator, classes.GreenIndicator].join(' ')}>В сети</p>
    else
        onlineIndicator =
            <p className={[classes.OnlineIndicator, classes.RedIndicator].join(' ')}>Не в сети</p>
    return (
        <SideBar>
            <div className={classes.ProfileCard}>
                <ProfileMainImg src={imgSrc}/>
                <p className={classes.ProfileName}>{name}</p>
                {onlineIndicator}
                <div className={classes.gridContainer}>
                    <div>
                        {totalGames} Игр
                    </div>
                    <div>
                        {totalWins} Побед
                    </div>
                </div>
                {buttons}
            </div>
        </SideBar>
    );
};

export default Profile;