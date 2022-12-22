import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import eyedrop from "../img/cinematicview.png";
import {format} from "timeago.js";
import axios from "axios";

const Container = styled.div`
  min-width: 250px;
  width: 300px;
  margin-bottom: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  gap: 10px;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  max-width: 36px;
  height: 36px;
  flex: 1;
  /* border-radius: 50%; */
  background-color: #999;
`;

const Texts = styled.div`
  flex: 3;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;


const Recommended = ({video}:any) => {
    const domain = import.meta.env.VITE_DOMAIN;
  const [channel, setChannel] = useState<any>([]);
  useEffect(()=>{
     const fetchChannel = async ()=>{
      const res = await axios.get(`${domain}/api/users/find/${video?.userId}`);
      setChannel(res.data);
     }
     fetchChannel();
    },[video?.userId])
  return (
    <Link to={`/videos/recommended/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container>
        <Image
          src={video.imgURL}
        />
        <Details >
          <ChannelImage
            className="object-center"
            src={channel.img}
          />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>{channel.username}</ChannelName>
            <Info>{video?.views} views • {format(video?.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Recommended;