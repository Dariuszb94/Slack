import React from "react";
import styled from "styled-components";

function ChatMessage() {
  return (
    <Container>
      <UserAvatar>
        <img src="https://randomuser.me/api/portraits/women/10.jpg" />
      </UserAvatar>
      <MessageContent>
        <Name>
          Raf Qazi<span>2/23/2021</span>
        </Name>
        <Text>How is</Text>
      </MessageContent>
    </Container>
  );
}

export default ChatMessage;

const Container = styled.div`
  padding: 8px 20px;
  display: flex;
  align-items: center;
  -webkit-transition: background-color 0.2s ease-in-out;
  -moz-transition: background-color 0.2s ease-in-out;
  -ms-transition: background-color 0.2s ease-in-out;
  -o-transition: background-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
  :hover {
    background-color: #f5f5f5;
  }
`;
const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 2px;
  overflow: hidden;
  margin-right: 8px;
  img {
    width: 100%;
  }
`;
const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.span`
  font-weight: 900;
  font-size: 15px;
  line-height: 1.4;

  span {
    margin-left: 8px;
    font-size: 13px;
    font-weight: 400;
    color: rgb(97, 86, 87);
  }
`;
const Text = styled.span``;
