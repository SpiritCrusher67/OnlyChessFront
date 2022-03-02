import React, {useState} from 'react';
import './App.css';
import NavBar from "./UI/NavBar/NavBar";
import {BrowserRouter} from "react-router-dom";
import Routing from "./Routing/Routing";
import {AuthContext} from "./Context/Contextes";

function App() {
    const [currentUserId, setCurrentUserId] = useState(0);
    const [hubConnection, setHubConnection] = useState({});
    const [token, setToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [newMsgChats, setNewMsgChats] = useState([]);
  return (
      <BrowserRouter>
          <AuthContext.Provider value={
              {
                  currentUserId: currentUserId, setCurrentUserId,
                  token, setToken,
                  refreshToken, setRefreshToken,
                  hubConnection, setHubConnection,
                  newMsgChats, setNewMsgChats
              }
          }>

              <div className="App">
                  <NavBar/>
                  <Routing/>
              </div>
          </AuthContext.Provider>
      </BrowserRouter>
  );
}

export default App;