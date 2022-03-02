import React, {useContext, useEffect, useState} from 'react';
import SideBar from "../UI/SideBar/SideBar";
import BlueButton from "../UI/Button/BlueButton";
import GrayInput from "../UI/Input/GrayInput";
import classes from "./GamePage.module.css"
import Board from "../UI/Board/Board";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {HubsPatches} from "../API";
import {AuthContext, GameConnectionContext} from "../Context/Contextes";
import GameStateIndicator from "../UI/Board/GameStateIndicator";
import GameConsole from "../UI/Board/GameConsole";
import {useNavigate, useParams} from "react-router-dom";
import ActiveGamesList from "../UI/List/ActiveGamesList";
import FriendsOnlineList from "../UI/List/FriendsOnlineList";
import MessageService from "../API/MessageService";

const GamePage = () => {
    const {inviteGameId} = useParams();
    const {token} = useContext(AuthContext);
    const [gameConnection, setGameConnection] = useState();
    const [gameId, setGameId] = useState();
    const [turnState, settTurnState] = useState();
    const [selectedField, setSelectedField] = useState();
    const navigate = useNavigate();

    useEffect(async () => {
        let builder = new HubConnectionBuilder().withUrl(HubsPatches.GameHub, {accessTokenFactory: () => token});
        builder.httpConnectionOptions.withCredentials = false;
        builder.withAutomaticReconnect();
        let connection = builder.build();
        setGameConnection(connection);
        await connection.start();
        connection.on("SetTurn", async (value) => {
            settTurnState(value)
        })
        connection.on("ReceiveCreatedGameId", async (id) => {
            setGameId(id)
        })
        connection.on("EndGame", async (isWin) => {
            let msg = isWin ? "Вы победили!" : "Вы проиграли"
            alert(msg)
            navigate("/News")
        })

        if (inviteGameId != undefined){
            setGameId(inviteGameId)
            await connection.invoke("JoinGame",inviteGameId);
        }
    },[])

    const createGame = async (e) => {
        e.preventDefault();

        await gameConnection.invoke("CreateGame");
    }
    const joinGame = async (e) => {
        if (e != undefined)
            e.preventDefault();

        await gameConnection.invoke("JoinGame",gameId);
    }

    const setGameIdAndJoin = async (e, id) => {
        e.preventDefault()

        setGameId(id)
        await joinGame();
    }

    const sendInviteToGame = async (e, login) => {
        e.preventDefault()

        await MessageService.SendInviteToGame(login,gameId)
    }

    return (
        <div className={classes.pageWrap}>
            <GameConnectionContext.Provider value={
                {
                    gameConnection, setGameConnection,
                    gameId, setGameId,
                    turnState, settTurnState,
                    selectedField, setSelectedField
                }}>
                <SideBar>
                <div className={classes.bar}>
                    <BlueButton onClick={createGame}>Создать</BlueButton>
                    <GrayInput placeholder="Id игры" value={gameId} onChange={(e) => setGameId(e.target.value)}/>
                    <BlueButton onClick={joinGame}>Присоединиться</BlueButton>
                    <h3>Присоединиться к</h3>
                    <ActiveGamesList onGameClick={setGameIdAndJoin}/>
                    <h3>Отправить приглашение</h3>
                    <FriendsOnlineList friendItemClick={sendInviteToGame}/>
                </div>
                </SideBar>
                <div className={classes.gameContainer}>
                    <div className={classes.gameWrap}>
                        <Board gameConnection={gameConnection}/>
                        <GameStateIndicator/>
                        <GameConsole/>
                    </div>
                </div>
                </GameConnectionContext.Provider>
        </div>
    );
};

export default GamePage;