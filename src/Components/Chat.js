import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ThemeContext from "./ThemeContext";
import AppTheme from "../Colors";
import db from "../firebase";
import { useParams } from "react-router";
import firebase from "firebase";
function Chat({ user }) {
  let { channelId } = useParams();
  const [channel, setChannel] = useState();
  const [messages, setMessages] = useState([]);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
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
  useEffect(() => {
    getChannel();
    getMessages();
  }, [channelId]);
  useEffect(() => {}, [...Object.values(theme)]);
  useEffect(() => {
    const array = localStorage.getItem("channels");
    const parsedArray = array ? JSON.parse(array) : [];
    const newArray = parsedArray.includes(channelId)
      ? parsedArray
      : [...parsedArray, channelId];
    localStorage.setItem("channels", JSON.stringify(newArray));
  }, []);
  return (
    <Container currentTheme={currentTheme}>
      <Header>
        <Channel>
          <ChannelName currentTheme={currentTheme}>
            #{channel?.name}
          </ChannelName>
          <ChannelInfo currentTheme={currentTheme}>Company wide</ChannelInfo>
        </Channel>
        <ChannelDetails currentTheme={currentTheme}>
          <div>Details</div>
          <Info />
        </ChannelDetails>
      </Header>
      <MessageContainer>
        {messages?.map((data, index) => (
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
const Container = styled.div`
  display: grid;
  grid-template-rows: 64px auto min-content;
  min-height: 0;
  background-color: ${(props) => props.currentTheme.backgroundColor};
`;
const Header = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(63, 39, 83, 0.13);
  justify-content: space-between;
`;
const Channel = styled.div``;
const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  color: #606060;
  color: ${(props) => props.currentTheme.textColor};
`;
const ChannelName = styled.div`
  font-weight: 700;
  color: ${(props) => props.currentTheme.textColor};
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
