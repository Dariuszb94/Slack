import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ThemeContext from "./ThemeContext";
import AppTheme from "../Colors";
import db from "../firebase";
import { useParams } from "react-router";
import firebase from "firebase";
import { gsap } from "gsap";
function Chat({ user, changeFavs }) {
  let { channelId } = useParams();
  const [channel, setChannel] = useState();
  const [messages, setMessages] = useState([]);
  const [isFav, setFav] = useState(false);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const boxRef = useRef();

  const getMessages = () => {
    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data());
        setMessages(messages);
      });
  };
  const sendMessage = (text) => {
    if (channelId) {
      let payload = {
        text: text,
        user: user.name,
        userImage: user.photo,
        timestamp: firebase.firestore.Timestamp.now(),
      };
      db.collection("rooms").doc(channelId).collection("messages").add(payload);
    }
  };
  const getChannel = () => {
    db.collection("rooms")
      .doc(channelId)
      .onSnapshot((snapshot) => {
        setChannel(snapshot.data());
      });
  };
  const save = () => {
    const array = localStorage.getItem("channels");
    const channelToFav = {
      id: channelId,
      name: channel.name,
    };
    const parsedArray = array ? JSON.parse(array) : [];
    let foundDouble = false;
    const parsedArrayToLoop = [...parsedArray];

    parsedArrayToLoop.forEach(function (searchedID, index) {
      if (searchedID.id == channelId) {
        parsedArray.splice(index, 1);
        return (foundDouble = true);
      }
    });
    if (!foundDouble) {
      parsedArray.push(channelToFav);
    }
    setFav(!foundDouble);

    localStorage.setItem("channels", JSON.stringify(parsedArray));
    changeFavs(parsedArray);
  };

  useEffect(() => {
    getChannel();
    getMessages();
  }, [channelId]);
  useEffect(() => {
    localStorage.getItem("channels")?.includes(channelId)
      ? setFav(true)
      : setFav(false);
  }, [channelId]);
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      [boxRef.current],
      1,
      {
        scale: 0.6,
      },
      { scale: 1.5 }
    ).play();
  }, [isFav]);
  return (
    <Container currentTheme={currentTheme}>
      <Header>
        <Channel>
          <ChannelName currentTheme={currentTheme}>
            #{channel?.name}
          </ChannelName>

          <SaveFav onClick={save}>
            <Heart
              ref={boxRef}
              isFav={isFav}
              version="1.1"
              id="heart-15"
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 15 15"
            >
              <path
                d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75&#xA;&#x9;C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z"
              />
            </Heart>
          </SaveFav>
        </Channel>
      </Header>
      <MessageContainer>
        {messages?.map((data) => (
          <ChatMessage
            text={data.text}
            name={data.user}
            image={data.userImage}
            timestamp={data.timestamp}
          />
        ))}
      </MessageContainer>
      <ChatInput sendMessage={sendMessage} />
    </Container>
  );
}

export default Chat;
const SaveFav = styled.div`
  cursor: pointer;
`;
const Heart = styled.svg`
  fill: ${(props) => (props.isFav ? "#340E36" : "lightgray")};
  filter: ${(props) =>
    props.isFav ? "drop-shadow(0px 0px 15px #340E36)" : null};
  -webkit-transition: -webkit-filter 500ms linear;
`;
const Container = styled.div`
  display: grid;
  grid-template-rows: 64px auto min-content;
  min-height: 0;
  background-color: ${(props) => props.currentTheme.backgroundColor};
  @media (max-width: 768px) {
    display: grid;
    height: 100%;
    align-content: start;
  }
`;
const Header = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(63, 39, 83, 0.13);
  justify-content: space-between;
`;
const Channel = styled.div`
  display: flex;
  align-items: center;
`;
const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  color: #606060;
  color: ${(props) => props.currentTheme.textColor};
`;
const ChannelName = styled.div`
  font-weight: 700;
  color: ${(props) => props.currentTheme.textColor};
  margin-right: 24px;
`;
const ChannelInfo = styled.div`
  font-weight: 400;
  color: #606060;
  font-size: 13px;
  margin-top: 8px;
  color: ${(props) => props.currentTheme.textColor};
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const Info = styled(InfoOutlinedIcon)`
  margin-left: 10px;
`;
