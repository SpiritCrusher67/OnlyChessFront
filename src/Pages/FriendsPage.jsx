import React, {useEffect, useState} from 'react';
import SideBar from "../UI/SideBar/SideBar";
import GrayInput from "../UI/Input/GrayInput";
import BlueButton from "../UI/Button/BlueButton";
import classes from "./FriendsPage.module.css"
import ProfileService from "../API/ProfileService";
import ImgService from "../API/ImgService";
import HorizontalProfile from "../UI/Profile/HorizontalProfile";

const FriendsPage = () => {
    const [selectFriend, setSelectFriend] = useState("");
    const [selectProfile, setSelectProfile] = useState("");
    const [profilesList, setProfilesList] = useState([]);

    useEffect(async () => {
        let profiles = await ProfileService.GetFiends();
        setProfilesList(profiles)
    }, [])

    const findFriend = async (e) => {
        e.preventDefault();
        if (selectFriend.length > 0)
            setProfilesList(await ProfileService.GetFriendsByName(selectFriend));
    }
    const findProfile = async (e) => {
        e.preventDefault();
        if (selectProfile.length > 0)
            setProfilesList(await ProfileService.GetProfilesByName(selectProfile));
    }

    return (
        <div>
            <SideBar>
                <div className={classes.searchBlock}>
                    <GrayInput placeholder="Поиск среди друзей" value={selectFriend} onChange={e => setSelectFriend(e.target.value)}/>
                    <BlueButton onClick={findFriend}>Найти</BlueButton>
                </div>
                <div className={classes.searchBlock}>
                    <GrayInput placeholder="Поиск по имени" value={selectProfile} onChange={e => setSelectProfile(e.target.value)}/>
                    <BlueButton onClick={findProfile}>Найти</BlueButton>
                </div>
            </SideBar>
            <div className={classes.ListContainer}>
                {
                    profilesList.map(
                        profile =>
                            <HorizontalProfile
                                key={profile.Login}
                                userLogin={profile.Login}
                                imgSrc={ImgService.GetProfileImgByLogin(profile.Login)}
                                isOnline={profile.IsUserOnline}
                                name={profile.Name}
                                totalGames={profile.GamesCount}
                                totalWins={profile.WinsCount}
                            />
                    )
                }
            </div>
        </div>
    );
};

export default FriendsPage;