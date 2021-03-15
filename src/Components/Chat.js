import React from "react";
import styled from "styled-components";
import InfoIcon from "@material-ui/icons/Info";
import StarBorderIcon from "@material-ui/icons/StarBorder";
function Chat() {
  return (
    <Container>
      <Header>
        <HeaderTop>
          <HeaderTopText>#clever</HeaderTopText> <StarBorderIcon />
        </HeaderTop>
        <HeaderBottom>Lorem Ipsum </HeaderBottom>
      </Header>
      <Details>
        <DetailsText>Details </DetailsText>
        <InfoIcon />
      </Details>
    </Container>
  );
}

export default Chat;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;
const Header = styled.div``;
const HeaderTop = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderBottom = styled.div``;
const HeaderTopText = styled.div`
  margin-right: 4px;
`;
const DetailsText = styled.div`
  margin-right: 4px;
`;

const Details = styled.div`
  display: flex;
`;
