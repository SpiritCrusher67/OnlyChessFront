import React, {useContext, useEffect, useState} from 'react';
import LoginForm from "../Form/LoginForm";
import classes from "./NavBar.module.css"
import BlueButton from "../Button/BlueButton";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../Context/Contextes";
import {FaEnvelope} from "react-icons/fa";

const NavBar = () => {
    const {currentUserId, newMsgChats} = useContext(AuthContext);
    const navigate = useNavigate();
    const [msgLink, setMsgLink] = useState()

    useEffect(()=>{
        if (newMsgChats.length == 0)
            setMsgLink(<Link to="/chat">Сообщения</Link>)
        else
            setMsgLink(<Link to="/chat">Сообщения <FaEnvelope/></Link>)
    }, [newMsgChats])

    let links;

    let loginBlock;

    if (currentUserId){
        links =
            <ul>
                <li><Link to="/news">Новости</Link></li>
                <li><Link to="/profile">Мой профиль</Link></li>
                <li>{msgLink}</li>
                <li><Link to="/friends">Друзья</Link></li>
                <li><Link to="/game">Играть</Link></li>
            </ul>
    }
    else {
        loginBlock =
            <div>
                <LoginForm/>
                <p>
                    <BlueButton onClick={() => navigate("/registration")}>Регистрация</BlueButton>
                </p>
            </div>
    }

    return (
        <div className={classes.Nav}>
            <div className={classes.logo}/>
            {links}
            {loginBlock}
        </div>
    );
};

export default NavBar;