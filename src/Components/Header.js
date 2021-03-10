import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

function Header() {
  return (
    <Container>
      <Main>
        <AccessTimeIcon />
        <HelpOutlineIcon />
      </Main>
      {/* <UserContainer></UserContainer> */}
    </Container>
  );
}

export default Header;

const Container = styled.div``;
const Main = styled.div``;
