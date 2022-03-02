import React, {useContext, useEffect, useState} from 'react';
import GrayInput from "../Input/GrayInput";
import BlueButton from "../Button/BlueButton";
import classes from "./FormStyles.module.css"
import AccountService from "../../API/AccountService";
import {AuthContext} from "../../Context/Contextes";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {AuthPatches, HubsPatches} from "../../API";
import axios from "axios";

const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [intercept, setIntercept] = useState();

    const {currentUserId, setCurrentUserId, setHubConnection, setToken, setRefreshToken, setNewMsgChats} = useContext(AuthContext);

    const logIn = async (e) =>{
        e.preventDefault();

        let userData = await AccountService.Login(login,password);
        setCurrentUserId(userData.login);
        setToken(userData.token);
        setRefreshToken(userData.refreshToken)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userData.token

        axios.interceptors.response.use(response => {
            return response;
        }, async error => {
            if (error.response.status === 401 & currentUserId != undefined) {
                let fData = new FormData();
                fData.append('RefreshToken', userData.refreshToken);
                fData.append('AccessToken', userData.token);
                let res = await axios({
                    method: "post",
                    url: AuthPatches.TokenRefresh,
                    data: fData,
                    headers: { "Content-Type": "application/json" },
                })
                if(res.status === 200){
                    console.log('is SETED')
                    console.log(res.data.token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                    setToken(res.data.token)
                    setRefreshToken(res.data.refreshToken)
                }
                else {
                    sessionStorage.setItem("login", undefined)
                }
            }
        })

        let builder = new HubConnectionBuilder().withUrl(HubsPatches.UsersHub, { accessTokenFactory: () => userData.token});
        builder.httpConnectionOptions.withCredentials = false;
        builder.withAutomaticReconnect();
        let connection = builder.build();
        setHubConnection(connection);
        await connection.start();
        connection.on("ReceiveMessage", async (msg) => {
            setNewMsgChats(oldArray => [...oldArray, msg.ChatId])
        })
    }

    return (
        <form className="form">
            <p className={classes.defP}>
                <GrayInput type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)}/>
            </p>
            <p className={classes.defP}>
                <GrayInput type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </p>
            <p className={classes.defP}>
                <BlueButton onClick={logIn}>Войти</BlueButton>
            </p>
        </form>
    );
};

export default LoginForm;