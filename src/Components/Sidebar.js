import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import db from "../firebase";
import { useHistory } from "react-router-dom";
function Sidebar(props) {
  const [expanded, setExpanded] = useState(true);
  const history = useHistory();
  const goToChannel = (id) => {
    if (id) {
      history.push(`/room/${id}`);
    }
  };
  const addChannel = () => {
    const promptName = prompt("Enter channel name");
    if (promptName) {
      db.collection("rooms").add({
        name: promptName,
      });
    }
  };
  const expand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <Container>
      <WorkspaceContainer>
        <Name>Chatter</Name>
      </WorkspaceContainer>
      <ChannelsContainer>
        <NewChannelContainer>
          <ChannelExpand>
            <div>Channels</div>
            <ExpandLessIconStyled onClick={expand} />
          </ChannelExpand>
          <AddIconStyled onClick={addChannel} />
        </NewChannelContainer>
        <ChannelsList>
          {props.rooms.map((item) => (
            <Channel
              onClick={() => {
                goToChannel(item.id);
              }}
            >
              #{item.name}
            </Channel>
          ))}
        </ChannelsList>
      </ChannelsContainer>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background-color: #3f0e40;
`;
const ChannelExpand = styled.div`
  display: flex;
`;
const AddIconStyled = styled(AddIcon)`
  cursor: pointer;
`;
const ExpandLessIconStyled = styled(ExpandLessIcon)`
  cursor: pointer;
`;

const WorkspaceContainer = styled.div`
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  justify-content: space-between;
  border-bottom: 1px solid #532753;
`;
const Name = styled.h1`
  font-size: 26px;
`;

const ChannelsContainer = styled.div`
  color: rgb(188, 171, 188);
  margin-top: 10px;
`;
const NewChannelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  padding-left: 19px;
  padding-right: 12px;
`;
const ChannelsList = styled.div`
  background-color: ${(props) =>
    props.expanded ? "white" : console.log(props)};
`;

const slideLeft = keyframes`
  0% {
    transform: translateX(40px);
  }
  100% {
    transform: translateX(0);
  }
`;
const slideRight = keyframes`
  0% {
    transform: translateX(-40px);
  }
  100% {
    transform: translateX(0);
  }
`;
const Channel = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  cursor: pointer;
  :hover {
    background-color: #350d36;
    font-weight: bold;
  }
  :nth-child(odd) {
    animation: ${slideLeft} 1s linear;
  }
  :nth-child(even) {
    animation: ${slideRight} 1s linear;
  }
`;
