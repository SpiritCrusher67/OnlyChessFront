import axios from "axios";
import {PostPatches} from "./index";

export default class PostService {
    static async GetNews(limit, page, setPgCount) {
        const responce = await axios.get( PostPatches.News, {
            params: {
                page: page,
                limit: limit
            }
        });
        if (setPgCount) setPgCount(responce.headers['totalpages']);
        return responce.data
    }

    static async GetPostsByUserLogin(login, limit, page, setPgCount) {

        const responce = await axios.get(PostPatches.Post + "/" + login, {
            params: {
                page: page,
                limit: limit,
                login: login
            }
        });
        if (setPgCount) setPgCount(responce.headers['totalpages']);

        return responce.data
    }

    static async CreatePost(title, text, tags, img){
        let formData = new FormData();
        formData.append('title',title);
        formData.append('text',text);
        formData.append('tags',tags);
        formData.append('postImage',img);

        await axios({
            method: "post",
            url: PostPatches.Post,
            data: formData,
            headers: { "Content-Type": "application/json" },
        })
    }

    static async SetLike(postId){
        await axios.get(PostPatches.SetLike + postId)
    }
    static async RemoveLike(postId){
        await axios.delete(PostPatches.RemoveLike + postId);
    }
}