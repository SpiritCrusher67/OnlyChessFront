import axios from "axios";
import {AccountPatches, AuthPatches} from "./index";

export default class AccountService{
    static async Login(login, password) {
        let formData = new FormData();
        formData.append('login',login);
        formData.append('password',password);
        const responce = await axios({
            method: "post",
            url: AuthPatches.Login,
            data: formData,
            headers: { "Content-Type": "application/json" },
        })
        return responce.data;
    }

    static async CreateAccount(login, password, confirmPassword, name,picture) {
        let formData = new FormData();
        formData.append('login',login);
        formData.append('password',password);
        formData.append('confirmPassword',confirmPassword);
        formData.append('name',name);
        formData.append('profileImage',picture);

        await axios({
            method: "post",
            url: AccountPatches.Account,
            data: formData,
            headers: { "Content-Type": "application/json" },
        })
    }

}