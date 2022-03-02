import axios from "axios";
import {ChatPatches} from "./index";

export default class MessageService{
     static async GetMessagesByChatId(id){
        const responce = await axios.get(ChatPatches.Chat + "/" + id);
        return responce.data;
    }

    static async GetChatList(){
        const responce = await axios.get(ChatPatches.Chat);
        return responce.data;
    }

    static async GetChatByUserLogin(login){
        const responce = await axios.post( ChatPatches.Chat + "?userLogin=" + login);
        return responce.data;
    }

    static async SendMessage(chatId, message){
        const responce = await axios.post(ChatPatches.Message + "?chatId=" + chatId + "&message=" + message);
        return responce.data;
    }
    static async SendInviteToFriend(userLogin){
        await axios.post(ChatPatches.Invite + "?userlogin=" + userLogin);
    }
    static async SendInviteToGame(userLogin, gameId){
        await axios.post(ChatPatches.InviteToGame+ "?userlogin=" + userLogin + "&gameId=" + gameId);
    }
    static async DeleteMessage(messageId){
        await axios.delete(ChatPatches.Message,{params:{id: messageId}});
    }
}