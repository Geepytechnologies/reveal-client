import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import eyedrop from "../img/eyedrop.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { fetchSuccess } from "../utils/videoSlice";
import { format } from "timeago.js";
import Recommended from "../components/Recommended";
const domain = import.meta.env.VITE_DOMAIN;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 24px;
  margin-top: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const VideoWrapper = styled.div`
 width: 100%;
 display: flex;
 justify-content: center;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
  width: 50%;
  //md
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  flex: 4;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  width: 70%;
  justify-content: center;
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #ef1e41;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  margin: 10px 0px;
  cursor: pointer;
`;

const RecommendedVideos = () => {
  const {currentuser}  = useSelector((state:any)=>state.user);
  const {currentvideo}  = useSelector((state:any)=>state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split('/')[3];
  const [channel, setChannel] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async ()=>{
      try {
        const videoRes = await axios.get(`${domain}/api/videos/find/${path}`);
        const channelRes = await axios.get(`${domain}/api/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data))
      }catch(err){
          // console.log(err)
      }
    };
    fetchData();
  },[path]);
  return (
    <Container className="md:flex-row">
      <Content>
        <VideoWrapper>
          <iframe
            className="h-[350px] md:h-[500px]"
            width="90%"
            
            src={currentvideo?.videoURL}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentvideo?.title}</Title>
        <Details>
          <Info>{currentvideo?.views} views • {format(currentvideo?.createdAt)}</Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon className="" /> {currentvideo?.likes?.length}
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon />
              <span className="hidden md:block">Dislike</span> 
            </Button>
            <Button>
              <ReplyOutlinedIcon /> 
              <span className="hidden md:block">Share</span> 
            </Button>
            <Button>
              <AddTaskOutlinedIcon />
              <span className="hidden md:block">Save</span> 
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.username}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentvideo?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <div className="flex-1 my-[20px] md:my-[0px] flex justify-center">
            <Subscribe className="w-[100%] sm:w-[100%]">SUBSCRIBE</Subscribe>
          </div>
        </Channel>
        <Hr />
        <Comments videoID={path}/>
      </Content>
    </Container>
  );
};

export default RecommendedVideos;