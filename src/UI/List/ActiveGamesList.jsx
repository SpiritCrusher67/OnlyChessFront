import React, {useContext, useEffect, useState} from 'react';
import classes from "./ActiveGamesList.module.css";
import GameItem from "./ListItems/GameItem";
import {GameConnectionContext} from "../../Context/Contextes";

const ActiveGamesList = ({onGameClick}) => {
    const [gamesList, setGamesList] = useState([])
    const {gameConnection} = useContext(GameConnectionContext)

    useEffect(async () => {
        if (gameConnection != undefined) {
            gameConnection.on("ReceiveActiveGames", async (games) =>{
                console.log(games)
                setGamesList(games)
            })
        }

    }, [gameConnection])
    return (
        <ul className={classes.List}>
            {
                gamesList.map(game =>
                    <li>
                        <GameItem
                            gameId={game.gameId}
                            userLogin={game.creatorLogin}
                            userName={game.creatorName}
                            click={onGameClick}
                        />
                    </li>
                )}
        </ul>
    );
};

export default ActiveGamesList;