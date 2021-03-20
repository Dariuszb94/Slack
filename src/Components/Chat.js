import React from "react";
import styled from "styled-components";
import InfoIcon from "@material-ui/icons/Info";
import StarBorderIcon from "@material-ui/icons/StarBorder";
function Chat() {
  return (
    <Container>
      <Header>
        <Channel>
          <ChannelName>#clever</ChannelName>
          <ChannelInfo>Company wide</ChannelInfo>
        </Channel>
        <ChannelDetails></ChannelDetails>
      </Header>
      <MessageContainer></MessageContainer>
      <ChatInput></ChatInput>
    </Container>
  );
}

export default Chat;
const Container = styled.div`
  display: grid;
  grid-template-rows: 64px auto min-content;
`;
const Header = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;
const Channel = styled.div``;
const ChannelDetails = styled.div``;
const ChannelName = styled.div`
  font-weight: 700;
`;
const ChannelInfo = styled.div`
  font-weight: 400;
  color: #606060;
  font-size: 13px;
  margin-top: 8px;
`;

const MessageContainer = styled.div``;
const ChatInput = styled.div``;
