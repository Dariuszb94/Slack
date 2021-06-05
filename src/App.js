import "./App.css";
import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import db from "./firebase";
import { auth, provider } from "./firebase";
import ThemeContext from "./components/ThemeContext";
import AppTheme from "./Colors";
function App() {
  const themeHook = useState("light");
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const [favs, changeFavs] = useState(
    JSON.parse(localStorage.getItem("channels"))
  );
  const [rooms, setRooms] = useState([]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  //const theme = "light";
  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
      setUser(null);
    });
  };
  const getChannels = () => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          return { id: doc.id, name: doc.data().name };
        })
      );
    });
  };
  const useClickOutside = (ref, callback) => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };
  useEffect(() => {
    getChannels();
  }, []);
  useEffect(() => {}, [changeFavs]);
  return (
    <ThemeContext.Provider value={themeHook}>
      <Router>
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <Container>
            <Header
              signOut={signOut}
              user={user}
              useClickOutside={useClickOutside}
            />
            <Main currentTheme={currentTheme} themeHook={themeHook}>
              <Sidebar rooms={rooms} favs={favs} />
              <Switch>
                <Route path="/room/:channelId">
                  <Chat changeFavs={changeFavs} user={user} />
                </Route>
                <Route path="/">
                  <ChannelEmpty>Select or create channel</ChannelEmpty>
                </Route>
              </Switch>
            </Main>
          </Container>
        )}
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`;
const ChannelEmpty = styled.div`
  padding: 20px;
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
  color: ${(props) => (props.themeHook[0] == "light" ? "black" : "white")};
  background-color: ${(props) =>
    props.themeHook[0] == "light" ? "white" : "#333333"};
`;
