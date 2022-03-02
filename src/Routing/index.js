import NewsPage from "../Pages/NewsPage";
import RegPage from "../Pages/RegPage";
import ProfilePage from "../Pages/ProfilePage";
import ChatPage from "../Pages/ChatPage";
import FriendsPage from "../Pages/FriendsPage";
import CreatePostPage from "../Pages/CreatePostPage";
import GamePage from "../Pages/GamePage";

export const publicRoutes =[
    {patch: "/news", element: <NewsPage/>},
    {patch: "/registration", element: <RegPage/>},
    {patch: "*", element: <NewsPage/>}
]

export const privateRoutes =[
    {patch: "/news", element: <NewsPage/>},
    {patch: "/profile/:login", element: <ProfilePage/>, exact:"true"},
    {patch: "/profile/createPost", element: <CreatePostPage/>, exact:"true"},
    {patch: "/profile", element: <ProfilePage/>, exact:"true"},
    {patch: "/chat/:login", element: <ChatPage/>, exact:"true"},
    {patch: "/chat", element: <ChatPage/>, exact:"true"},
    {patch: "/friends", element: <FriendsPage/>},
    {patch: "/game/:inviteGameId", element: <GamePage/>},
    {patch: "/game", element: <GamePage/>},
    {patch: "*", element: <NewsPage/>}
]