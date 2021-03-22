import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <Content>
        <SlackImg src="https://img.icons8.com/ios/452/communication.png" />
        <h1>Sign in Slack</h1>
        <SignInButton>Sign In With Google</SignInButton>
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  background-color: white;
  padding: 100px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgb(0 0 0 /12%), 0 1px 2px rgb(0 0 0 / 24%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SlackImg = styled.img`
  height: 100px;
`;
const SignInButton = styled.button``;
