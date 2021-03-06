import React, { useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";

function ChatInput({ sendMessage }) {
  const [input, setInput] = useState("");
  const send = (e) => {
    e.preventDefault();
    if (!input) return;
    sendMessage(input);
    setInput("");
  };
  return (
    <Container>
      <InputContainer>
        <form onSubmit={send}>
          <Input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            value={input}
            placeholder="Message here..."
          />
          <SendButton type="submit" onClick={send}>
            <Send />
          </SendButton>
        </form>
      </InputContainer>
    </Container>
  );
}

export default ChatInput;
const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-left: 24px;
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    width: calc(100% - 44px);
    padding-left: 20px;
  }
`;
const Input = styled.input`
  background-color: inherit;
`;
const InputContainer = styled.div`
  border: 1px solid #8d8d8e;
  border-radius: 4px;
  margin-bottom: 8px;
  form {
    display: flex;
    height: 42px;
    align-items: center;
    padding-left: 10px;
    input {
      flex: 1;
      border: none;
      font-size: 13px;
    }
    input:focus {
      outline: none;
    }
  }
`;
const SendButton = styled.div`
  background-color: #007a5a;
  border-radius: 2px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  cursor: pointer;
  svg {
    width: 18px;
  }
  :hover {
    background-color: #148567;
  }
`;
const Send = styled(SendIcon)`
  color: #d9d9d9;
`;
