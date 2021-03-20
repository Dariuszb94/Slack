import React from "react";
import styled from "styled-components";
import InfoIcon from "@material-ui/icons/Info";
import StarBorderIcon from "@material-ui/icons/StarBorder";
function Chat() {
  return (
    <Container>
      <Header></Header>
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
const Header = styled.div``;
const MessageContainer = styled.div``;
const ChatInput = styled.div``;
