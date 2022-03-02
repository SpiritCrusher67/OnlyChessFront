import classes from "./ChatList.module.css";
import ChatItem from "./ListItems/ChatItem";

const ChatList = ({chats, loadMsgsFunc}) => {
    return (
        <ul className={classes.ChatList}>
            {
                chats.map(chat =>
                <li>
                    <ChatItem
                        id={chat.Id}
                        name={chat.Name}
                        login={chat.Login}
                        func={loadMsgsFunc}
                        isUserOnline={chat.IsUserOnline}
                    />
                </li>
            )}
        </ul>
    );
};

export default ChatList;