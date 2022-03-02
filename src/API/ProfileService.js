import axios from "axios";
import {AccountPatches} from "./index";

export default class ProfileService{
    static async GetByLogin(login) {
        let responce;
        if (login)
            responce = await axios.get(AccountPatches.UserData + login);
        else
            responce = await axios.get(AccountPatches.Account);

        return responce.data[0]
    }

    static async GetFiends(){
        const responce = await axios.get(AccountPatches.GetFriends);
        return responce.data;
    }

    static async GetFriendsByName(name){
        const responce = await axios.get(AccountPatches.FriendsByName, {params:{name: name}});
        return responce.data;
    }

    static async GetProfilesByName(name){
        const responce = await axios.get(AccountPatches.UsersByName, {params:{name: name}});
        return responce.data;
    }
    static async RemoveFriend(friendLogin){
        await axios.delete(AccountPatches.RemoveFriend, {params:{friendLogin: friendLogin}});
    }
}