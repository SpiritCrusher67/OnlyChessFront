import React, {useContext, useEffect, useState} from 'react';
import Profile from "../UI/Profile/Profile";
import Post from "../UI/Post/Post";
import classes from "./ProfilePage.module.css";
import ProfileService from "../API/ProfileService";
import ImgService from "../API/ImgService";
import PostService from "../API/PostService";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import {AuthContext} from "../Context/Contextes";
import {useParams} from "react-router-dom";

const ProfilePage = () => {
    const [pgLimit, setPgLimit] = useState(10);
    const [page, setPage] = useState(1);
    const {currentUserId, setCurrentUserId} = useContext(AuthContext);
    const {login} = useParams();

    const [userLogin, setUserLogin] = useState();

    const [profile, setProfile] = useState({});

    const [posts, setPosts] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);

    useEffect(async () => {
        let user;
        if (login){
            user = login;
        }
        else {
            user = currentUserId;
        }
        setUserLogin(user);

        let prof = await ProfileService.GetByLogin(user);
        if (login == undefined)
            prof.IsMy = true;
        setProfile(prof);

        let pgsCount = 0;
        let p = await PostService.GetPostsByUserLogin(user, pgLimit, page, (c) => pgsCount = c);
        setPosts(p);
        setPagesCount(pgsCount);
        console.log(p)
    },[])

    const prevPage = async (e) =>{
        e.preventDefault();
        if (page > 1){
            setPage(page - 1);
            setPosts(await PostService.GetPostsByUserLogin(userLogin, pgLimit, page - 1));
        }
    }
    const nextPage = async (e) =>{
        e.preventDefault();
        if (page < pagesCount){
            setPage(page + 1);
            setPosts(await PostService.GetPostsByUserLogin(userLogin, pgLimit, page + 1));
        }
    }

    return (
        <div className={classes.PageContainer}>
            <Profile
                key={profile.Login}
                imgSrc={ImgService.GetProfileImgByLogin(profile.Login)}
                name={profile.Name}
                totalGames={profile.GamesCount}
                totalWins={profile.WinsCount}
                isOnline={profile.IsUserOnline}
                isMy={profile.IsMy}
                isFriend={profile.IsFriend == 1}
                userLogin={profile.Login}
            />

            <div className={classes.PostsContainer}>
                {
                    posts.map(
                        post =>
                            <Post
                                key={post.Id}
                                authorLogin={post.UserLogin}
                                author={post.AuthorName}
                                isAuthorOnline={post.IsAuthorOnline}
                                title={post.Title}
                                text={post.Text}
                                id={post.Id}
                                tagsArr={post.Tags}
                                timeAgo={post.Date}
                                commentsCount={post.Comments}
                                likesCount={post.Likes}
                                isLiked={post.Liked}
                            />
                    )
                }

                <div className={classes.pageControl}>
                    <div className={classes.pgControl} onClick={prevPage}><FaAngleLeft/></div>
                    <div>{page}/{pagesCount}</div>
                    <div className={classes.pgControl} onClick={nextPage}><FaAngleRight/></div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
