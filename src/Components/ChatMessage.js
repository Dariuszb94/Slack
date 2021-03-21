import React from "react";
import styled from "styled-components";

function ChatMessage() {
  return (
    <Container>
      <UserAvatar>
        <img src="" />
      </UserAvatar>
      <MessageContent>
        <Name>Raf Qazi</Name>
        <Text>How is</Text>
      </MessageContent>
    </Container>
  );
}

export default ChatMessage;

const Container = styled.div`
  background-color: orange;
`;
const UserAvatar = styled.div``;
const MessageContent = styled.div``;
const Name = styled.span``;
const Text = styled.span``;
