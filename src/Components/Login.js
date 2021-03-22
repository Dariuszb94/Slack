import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <Content>
        <SlackImg src="https://img.icons8.com/ios/452/communication.png" />
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
`;
const SlackImg = styled.img`
  height: 100px;
`;
