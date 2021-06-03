import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import db from "../firebase";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function Sidebar(props) {
  const [expanded, setExpanded] = useState(true);
  const [favChannels, setFavChannels] = useState(
    JSON.parse(localStorage.getItem("channels"))
  );

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
  useEffect(() => {
    setFavChannels(props.favs);
  }, [props.favs]);
  useEffect(() => {}, []);
  return (
    <Container>
      <WorkspaceContainer>
        <Name> Chatter </Name>
      </WorkspaceContainer>
      <FavChannelsContainer>
        <FavTitle>Favourite channels</FavTitle>
        {favChannels?.map((item) => (
          <Channel
            expanded={expanded}
            onClick={() => {
              goToChannel(item.id);
            }}
          >
            #{item.name}
          </Channel>
        ))}
      </FavChannelsContainer>
      <ChannelsContainer>
        <NewChannelContainer>
          <ChannelExpand onClick={expand}>
            <div> Channels </div>
            <ExpandLessIconStyled expanded={expanded} />
          </ChannelExpand>
          <AddIconStyled onClick={addChannel} />
        </NewChannelContainer>
        <ChannelsList expanded={expanded}>
          {props.rooms.map((item) => (
            <Channel
              expanded={expanded}
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
const FavTitle = styled.div`
  color: rgb(188, 171, 188);
  padding-left: 19px;
`;
const FavChannelsContainer = styled.div``;
const ChannelExpand = styled.div`
  display: flex;
  cursor: pointer;
`;
const AddIconStyled = styled(AddIcon)`
  cursor: pointer;
`;
const ExpandLessIconStyled = styled(ExpandLessIcon)`
  cursor: pointer;
  transform: ${(props) => (props.expanded ? "rotate(0)" : "rotate(180deg)")};
  -webkit-transition: transform 0.5s ease-in-out;
  -moz-transition: transform 0.5s ease-in-out;
  -ms-transition: transform 0.5s ease-in-out;
  -o-transition: transform 0.5s ease-in-out;
  transition: transform 0.5s ease-in-out;
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
  max-height: ${(props) => (props.expanded ? "1000px" : 0)};
  overflow: hidden;
  -webkit-transition: max-height 0.5s ease-in-out;
  -moz-transition: max-height 0.5s ease-in-out;
  -ms-transition: max-height 0.5s ease-in-out;
  -o-transition: max-height 0.5s ease-in-out;
  transition: max-height 0.5s ease-in-out;
`;
const slideLeft = (y) => keyframes`
   0% {
    transform: translateX(40px);
  }
  100% {
    transform: translateX(0);
  }
`;
const slideRight = (y) => keyframes`
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
  color: rgb(188, 171, 188);
  :hover {
    background-color: #350d36;
    font-weight: bold;
  }
  :nth-child(odd) {
    animation: ${(props) => (props.expanded ? slideLeft(props.y) : null)} 1s
      linear;
  }
  :nth-child(even) {
    animation: ${(props) => (props.expanded ? slideRight(props.y) : null)} 1s
      linear;
  }
`;
