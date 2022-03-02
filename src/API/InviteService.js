import axios from "axios";
import {ChatPatches} from "./index";

export default class InviteService{

    static async AcceptInviteToFriends(inviteId){
        await axios.post(ChatPatches.InviteAccept + "?messageId=" + inviteId);
    }
    static async DecideInviteToFriends(inviteId){
        await axios.post(ChatPatches.InviteDecline + "?messageId=" + inviteId);
    }
}