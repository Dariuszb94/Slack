import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { keyframes } from "styled-components";
import Typewriter from "typewriter-effect";
function Login(props) {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          photo: result.user.photoURL,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        props.setUser(newUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <Container>
      <Content>
        <SlackImg src="https://img.icons8.com/ios/452/communication.png" />
        <Title>
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("Chatter").start();
            }}
          />
        </Title>
        <Subtitle>
          <Typewriter
            options={{
              delay: 40,
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1500)
                .typeString("Just chat")
                .pauseFor(500)
                .typeString(" :)")
                .start();
            }}
          />
        </Subtitle>
        <SignInButton
          onClick={() => {
            signIn();
          }}
        >
          Sign In With Google
        </SignInButton>
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1``;
const Subtitle = styled.h2`
  font-size: 20px;
`;

const Content = styled.div`
  background-color: white;
  padding: 100px;
  border-radius: 4px;
  -webkit-box-shadow: 10px 9px 24px 3px rgba(63, 14, 64, 0.71);
  -moz-box-shadow: 10px 9px 24px 3px rgba(63, 14, 64, 0.71);
  box-shadow: 10px 9px 24px 3px rgba(63, 14, 64, 0.71);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    padding: 40px;
  }
`;
const baloon = keyframes`
  0% {
    transform: translateY(-100px) scale(0.1);
  }
80%{
  transform:scale(1.3);
  transform: translateY(20px) scale(1.3);
}
  100% {
    transform: translateY(0) scale(1);

  }
`;

const SlackImg = styled.img`
  height: 100px;
  margin-bottom: 25px;
  animation: ${baloon} 1s ease-in-out;
`;
const emerge = keyframes`
  0% {
    transform: translateY(100px) scale(0.3);
    color:transparent;
  }
80%{
  color:transparent;
  transform:scale(1.2);

}
  100% {
    transform: translateY(0) scale(1);
    color:white;

  }
`;

const SignInButton = styled.button`
  height: 48px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 8px 12px rgb(0 0 0 / 10%);
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  margin-top: 25px;
  background-color: #3f0e40;
  color: white;
  border: none;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  -webkit-transition: transform 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  -moz-transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  -ms-transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  -o-transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  animation: ${emerge} 1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    background-color: #522653;
  }
  @media (max-width: 1000px) {
    width: 200px;
  }
`;
