import React, {useContext, useEffect, useState} from 'react';
import classes from "./GameStateIndicator.module.css";
import {GameConnectionContext} from "../../Context/Contextes";

const GameStateIndicator = () => {
    const {turnState} = useContext(GameConnectionContext)
    const [className, setClassName] = useState()
    const [stateText, setStateText] = useState()
    useEffect(() =>{
        switch (turnState){
            case true:
                setClassName(classes.indicatorGreen)
                setStateText("Ваш ход")
                break

            case false:
                setClassName(classes.indicatorRed)
                setStateText("Ход противника")
                break

            default:
                setClassName(classes.indicatorGray)
                setStateText("Ожидание начала игры")
                break

        }
    },[turnState])



    return (
        <div className={classes.indicatorContainer}>
            <div className={[classes.indicator, className].join(' ')}/>
            <p>{stateText}</p>
        </div>
    );
};

export default GameStateIndicator;