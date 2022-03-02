import {useState} from 'react';
import classes from "./Page.module.css";
import GrayInput from "../UI/Input/GrayInput";
import BlueButton from "../UI/Button/BlueButton";
import AccountService from "../API/AccountService";

const RegPage = () => {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [name, setName] = useState();
    const [picture,setPicture] = useState();

    const createAcc = async (e) =>{
        e.preventDefault();
        await AccountService.CreateAccount(login,password,confirmPassword,name,picture);
    }
    return (
        <div className={classes.FormContainer}>
            <h3>Создать аккаунт</h3>
            <form className={classes.FormContainer}>
                <GrayInput placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)}/>
                <GrayInput placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)}/>
                <GrayInput placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <GrayInput placeholder="Повторите пароль" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <GrayInput placeholder="Изображение" onChange={(e) => setPicture(e.target.files[0])} type="file"/>
                <BlueButton onClick={createAcc}>Создать</BlueButton>
            </form>
        </div>
    );
};

export default RegPage;