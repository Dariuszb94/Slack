import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useReducer,
} from "react";
import useClickOutside from "./hooks/ClickOutsideHook";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import db from "../firebase";
import firebase from "firebase";
import ThemeContext from "./ThemeContext";
import ThemeToggler from "./ThemeToggler";
import AppTheme from "../Colors";

import { useHistory } from "react-router-dom";
function Header({ user, signOut, onClickOutside }) {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const [resultsList, setResultsList] = useState([]);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const history = useHistory();
  const node = useRef();
  const clickRef = useRef();

  useClickOutside(clickRef, () => setResultsList([]));
  useClickOutside(node, () => setShow(false));

  const goToChannel = (id) => {
    setResultsList([]);
    setInput("");
    if (id) {
      history.push(`/room/${id}`);
    }
  };
  const getMessages = async (id) => {
    if (id.length == 0) {
      setResultsList([]);
      setInput(id);
      return;
    }
    await setInput(id);
    let messages = db
      .collectionGroup("messages")
      .where("text", ">=", input)
      .where("text", "<=", input + "\uf8ff");
    messages.get().then((querySnapshot) => {
      let resultsListRaw = [];
      querySnapshot.forEach((doc) => {
        let result = {
          channel: doc.ref.parent.parent.id,
          text: doc.data().text,
        };
        resultsListRaw.push(result);
      });
      setResultsList(resultsListRaw.slice(0, 5));
    });
  };
  useEffect(() => {}, [resultsList]);
  const showSignOut = () => {
    setShow((prev) => !prev);
  };

  return (
    <Container>
      <Main>
        <SearchContainer>
          <Search>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                getMessages(e.target.value);
              }}
              type="text"
              value={input}
            />
          </Search>
          <Results className="results" ref={clickRef}>
            {resultsList.map((result) => {
              return (
                <Result
                  onClick={() => goToChannel(result.channel)}
                  currentTheme={currentTheme}
                >
                  {result.text}
                </Result>
              );
            })}
          </Results>
        </SearchContainer>
        <SearchIconStyled onClick={() => getMessages(input)} />
      </Main>
      <ThemeToggleContainer>
        <ThemeToggler />
      </ThemeToggleContainer>

      <UserContainer ref={node} onClick={showSignOut}>
        <Name>{user.name}</Name>
        <UserImage>
          <img
            src={user.photo ? user.photo : "https://i.imgur.com/6VBx3io.png"}
            alt={user.name}
          />
          <Logout show={show} onClick={signOut}>
            Log Out
          </Logout>
        </UserImage>
      </UserContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  background-color: #350d36;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 8px;
  }
`;

const ThemeToggleContainer = styled.div`
  cursor: pointer;
  @media (max-width: 768px) {
    position: absolute;
    right: 8px;
    top: 8px;
  }
`;
const Results = styled.ul`
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;
const Result = styled.li`
  padding: 8px;
  cursor: pointer;
  color: black;
  border-right: 1px solid #debcde;
  border-left: 1px solid #debcde;
  &:nth-child(odd) {
    background-color: #debcde;
  }

  &:first-child {
    border-top: 1px solid #debcde;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  &:last-child {
    border-bottom: 1px solid #debcde;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  &:nth-child(even) {
    color: ${(props) => props.currentTheme.textColor};
    background-color: ${(props) => props.currentTheme.backgroundColor};
  }
`;

const Logout = styled.div`
  position: absolute;
  bottom: -40px;
  right: 0;
  background-color: #3f0e40;
  width: 80px;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  border: 2px solid white;
  display: ${(props) => (props.show ? "block" : "none")};
  cursor: pointer;
`;
const Main = styled.div`
  display: flex;
  margin-right: 16px;
  margin-left: 16px;
  @media (max-width: 768px) {
    min-width: unset;
    margin-top: 8px;
  }
`;
const SearchContainer = styled.div`
  min-width: 400px;
  position: relative;
  @media (max-width: 768px) {
    min-width: unset;
  }
`;
const Search = styled.div`
  box-shadow: inset 0 0 0 1px rgb(104 74 104);
  border-radius: 6px;
  width: 100%;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    padding-left: 8px;
    padding-right: 8px;
    color: white;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  input:focus {
    outline: none;
  }
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
  right: 0;
  cursor: pointer;
  @media (max-width: 768px) {
    margin-bottom: 8px;
    align-self: self-start;
  }
`;
const Name = styled.div`
  padding-right: 16px;
`;
const SearchIconStyled = styled(SearchIcon)`
  cursor: pointer;
  margin-left: 8px;
`;
const UserImage = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid white;
  border-radius: 3px;
  position: relative;
  img {
    width: 100%;
  }
`;
