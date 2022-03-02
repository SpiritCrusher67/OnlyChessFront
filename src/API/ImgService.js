import {AccountPatches, GamePatches, PostPatches} from "./index";

export default class ImgService{
    static GetProfileImgByLogin(login){
        return AccountPatches.GetImage + "?login=" + login
    }
    static async GetPostImgById(id){
        let res = await fetch(PostPatches.GetPostImage + "?id=" + id);
        if (res.ok)
            return PostPatches.GetPostImage + "?id=" + id
        return ""
    }

    static async GetFigureImg(side, type){
        let patch = GamePatches.GetImage + "?side=" + side + "&type=" + type
        let res = await fetch(patch);
        if (res.ok)
            return patch
    }
}