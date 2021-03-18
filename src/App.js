import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import styled from "styled-components";
import firebase from "./firebase";
function App() {
  const getChannels = () => {
    //console.log(firebase);
    firebase
      .collection("rooms")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  return (
    <div className="App">
      <Router>
        <Container>
          <Header />
          <Main>
            <button onClick={() => getChannels()} />
            <Sidebar />
            <Switch>
              <Route path="/room">
                <Chat />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </Main>
        </Container>
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px auto;
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
`;
