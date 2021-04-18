import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

function Header({ user, signOut }) {
  const [show, setShow] = useState(false);
  const node = useRef();
  const showSignOut = () => {
    setShow((prev) => !prev);
  };
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    // outside click
    setShow(false);
  };
  return (
    <Container>
      <Main>
        <AccessTimeIcon />
        <SearchContainer>
          <Search>
            <input type="text" placeholder="Search" />
          </Search>
        </SearchContainer>
        <HelpOutlineIcon />
      </Main>
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
  justify-content: center;
  position: relative;
  z-index: 10;
  box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
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
`;
const SearchContainer = styled.div`
  min-width: 400px;
  margin-left: 16px;
  margin-right: 16px;
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
  position: absolute;
  right: 0;
  cursor: pointer;
`;
const Name = styled.div`
  padding-right: 16px;
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
