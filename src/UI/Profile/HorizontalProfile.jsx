import React from 'react';
import SmallProfileImg from "../Img/SmallProfileImg";
import classes from "./HorizontalProfile.module.css";
import {useNavigate} from "react-router-dom";

const HorizontalProfile = ({imgSrc, name, totalGames, totalWins, userLogin, isOnline}) => {
    const navigate = useNavigate();

    return (
        <div className={classes.HorizontalProfileItem} onClick={() => navigate("/profile/" + userLogin)}>
            <SmallProfileImg imgSrc={imgSrc} isOnline={isOnline}/>
            <div className={classes.userName}><p>{name}</p></div>
            <p>Игр: {totalGames}</p>
            <p>Побед: {totalWins}</p>
        </div>
    );
};

export default HorizontalProfile;