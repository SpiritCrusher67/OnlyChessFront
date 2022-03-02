import React, {useState} from 'react';
import classes from "./Page.module.css"
import GrayInput from "../UI/Input/GrayInput";
import BlueButton from "../UI/Button/BlueButton";
import PostService from "../API/PostService";

const CreatePostPage = () => {
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [tags, setTags] = useState();
    const [picture,setPicture] = useState();

    const createPost = async (e) =>{
        e.preventDefault();
        await PostService.CreatePost(title,text,tags, picture);
    }

    return (
        <div className={classes.FormContainer}>
            <h3>Создать пост</h3>
            <form className={classes.FormContainer}>
                <GrayInput placeholder="Заголовок"value={title} onChange={(e) => setTitle(e.target.value)}/>
                <GrayInput isMultiLine={true} rows="4" cols="55" placeholder="Текст"  value={text} onChange={(e) => setText(e.target.value)}/>
                <GrayInput placeholder="Тэги" value={tags} onChange={(e) => setTags(e.target.value)}/>
                <GrayInput placeholder="Изображение" onChange={(e) => setPicture(e.target.files[0])} type="file"/>
                <BlueButton onClick={createPost}>Создать</BlueButton>
            </form>
        </div>
    );
};

export default CreatePostPage;