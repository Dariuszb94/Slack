import React from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send"
function ChatInput() {
  return <Container><InputContainer><form>
    <input type="text" placeholder="Message here..."/><SendButton><SendIcon/></SendButton></form></InputContainer></Container>;
}

export default ChatInput;
const Container = styled.div`
padding-left:20px;
padding-right:20px;
padding-left:24px;

`;
const InputContainer = styled.div`
border: 1px solid #8d8d8e;
border-radius:4px;
form{
  display:flex;
  height:42px;
  align-items:center;
  padding-left:10px;
  input{
    flex:1;
    border:none;
    font-size:13px;
  }
  input:focus{
    outline:none;
  }
}
`;
const SendButton = styled.div`
background-color:#007a5a;
border-radius:2px;
`;