import NewsPage from "../Pages/NewsPage";
import ProfilePage from "../Pages/ProfilePage";
import CreatePostPage from "../Pages/CreatePostPage";
import ChatPage from "../Pages/ChatPage";
import FriendsPage from "../Pages/FriendsPage";

export const privateRoutes =[
    {patch: "/news", element: <NewsPage/>},
    {patch: "/profile/:login", element: <ProfilePage/>, exact:"true"},
    {patch: "/profile/createPost", element: <CreatePostPage/>, exact:"true"},
    {patch: "/profile", element: <ProfilePage/>, exact:"true"},
    {patch: "/chat/:login", element: <ChatPage/>, exact:"true"},
    {patch: "/chat", element: <ChatPage/>, exact:"true"},
    {patch: "/friends", element: <FriendsPage/>},
    {patch: "*", element: <NewsPage/>}
]

export class APIPatches{
    static Root ="https://localhost:7172"
    static Api = APIPatches.Root + "/api"

}
export class AuthPatches{
    static Auth = APIPatches.Api+  "/Auth"
    static Login = AuthPatches.Auth + "/Login"
    static TokenRefresh = AuthPatches.Auth + "/Token/Refresh"
    static TokenRevoke = AuthPatches.Auth + "/Token/Revoke"

}
export class AccountPatches{
    static Account = APIPatches.Api + "/Account"
    static GetName  = AccountPatches.Account + "/GetName"
    static GetImage = AccountPatches.Account + "/GetProfileImage"
    static UsersByName  = AccountPatches.Account + "/Users/ByName"
    static UserData  = AccountPatches.Account + "/UserData/"
    static GetFriends  = AccountPatches.Account + "/GetFriends"
    static RemoveFriend  = AccountPatches.Account + "/RemoveFriend"
    static FriendsByName  = AccountPatches.Account + "/Friends/ByName"
}
export class ChatPatches{
    static Chat = APIPatches.Api + "/Chat"
    static Message  = ChatPatches.Chat + "/Message"
    static Invite  = ChatPatches.Chat + "/Invite"
    static InviteToGame  = ChatPatches.Chat + "/InviteToGame"
    static InviteAccept  = ChatPatches.Invite + "/Accept"
    static InviteDecline = ChatPatches.Invite + "/Decline"
}
export class PostPatches{
    static Post = APIPatches.Api + "/Post"
    static News  = PostPatches.Post + "/News"
    static GetPostImage  = PostPatches.Post + "/GetPostImage"
    static SetLike  = PostPatches.Post + "/SetLike/"
    static RemoveLike  = PostPatches.Post + "/RemoveLike/"
    static News  = PostPatches.Post + "/News"
}
export class HubsPatches{
    static UsersHub = APIPatches.Api + "/Hubs/UsersHub"
    static GameHub = APIPatches.Api + "/Hubs/ChessHub"
}
export class GamePatches{
    static Game = APIPatches.Api + "/Game"
    static GetImage = GamePatches.Game + "/GetFigureImage"
}

