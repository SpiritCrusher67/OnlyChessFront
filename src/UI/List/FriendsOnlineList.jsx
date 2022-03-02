import React, {useContext, useEffect, useState} from 'react';
import classes from "./ActiveGamesList.module.css";
import {AuthContext} from "../../Context/Contextes";
import FriendItem from "./ListItems/FriendItem";

const FriendsOnlineList = ({friendItemClick}) => {
    const [friendsList, setFriendsList] = useState([])
    const {hubConnection} = useContext(AuthContext)

    useEffect(async () => {
        if (hubConnection != undefined) {
            hubConnection.on("ReceiveOnlineFriends", async (friends) =>{
                console.log(friends)
                setFriendsList(friends)
            })

            await hubConnection.invoke("GetOnlineFriends")
        }
    }, [hubConnection])

    return (
        <ul className={classes.List}>
            {
                friendsList.map(friend =>
                    <li>
                        <FriendItem
                            userName={friend.Name}
                            userLogin={friend.Login}
                            click={friendItemClick}
                        />
                    </li>
            )}
        </ul>
    );
};

export default FriendsOnlineList;