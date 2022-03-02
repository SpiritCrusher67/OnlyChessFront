import React, {useEffect, useState} from 'react';
import Post from "../UI/Post/Post";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import PostService from "../API/PostService";
import classes from "./ProfilePage.module.css";

const NewsPage =() => {
    const [pgLimit, setPgLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);

    useEffect(async () => {
        let pgsCount = 0;
        let data = await PostService.GetNews(pgLimit, page, (c) => pgsCount = c);
        setPosts(data);
        setPagesCount(pgsCount);
    }, [])

    const prevPage = async (e) => {
        e.preventDefault();
        if (page > 1) {
            setPage(page - 1);
            setPosts(await PostService.GetNews(pgLimit, page - 1));
        }
    }
    const nextPage = async (e) => {
        e.preventDefault();
        if (page < pagesCount) {
            setPage(page + 1);
            setPosts( await PostService.GetNews(pgLimit, page + 1));
        }
    }

    return (
        <div className={classes.PageContainer}>
            <div className={classes.PostsContainer}>
                {
                    posts.map(
                        post =>
                            <Post
                                key={post.Id}
                                authorLogin={post.UserLogin}
                                isAuthorOnline={post.IsAuthorOnline}
                                author={post.AuthorName}
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

export default NewsPage;