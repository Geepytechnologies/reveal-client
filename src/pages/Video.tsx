import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import eyedrop from "../img/eyedrop.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { dislike, fetchSuccess, like } from "../utils/videoSlice";
import { format } from "timeago.js";
import Recommended from "../components/Recommended";
import Cookies from "universal-cookie";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { subscription } from "../utils/userSlice";

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

const VideoFrame = styled.video`
  max-height: 450px;
  width: 95%;
  object-fit: contain;
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
  width: 70%;
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
  border: 1px solid #e6e6e6;
  /* background-color: #e6e6e6; */
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

const Video = () => {
  const domain = import.meta.env.VITE_DOMAIN;
  const { currentuser } = useSelector((state: any) => state.user);
  const { currentvideo } = useSelector((state: any) => state.video);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState<any | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`${domain}/api/videos/find/${path}`);
        const channelRes = await axios.get(
          `${domain}/api/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        // console.log(videoRes.data)
      } catch (err) {
        // console.log(err)
      }
    };
    fetchData();
  }, [path, dispatch]);
  const [randomvideos, setRandomVideos] = useState([]);
  const [recommendedvideos, setRecommendedVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${domain}/api/videos/random`);
      setRandomVideos(res.data);
    };
    fetchVideos();
  }, []);
  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      const res = await axios.get(
        `${domain}/api/videos/tags?tags=${currentvideo?.tags}`
      );
      setRecommendedVideos(res.data);
    };
    fetchRecommendedVideos();
  }, []);
  const handleLike = async () => {
    await axios(`${domain}/api/users/like/${currentvideo._id}`, {
      method: "PUT",
      headers: { token: `Bearer ${currentuser.accessToken}` },
    });
    dispatch(like(currentuser.others._id));
  };
  const handleDislike = async () => {
    await axios(`${domain}/api/users/dislike/${currentvideo._id}`, {
      method: "PUT",
      headers: { token: `Bearer ${currentuser.accessToken}` },
    });
    dispatch(dislike(currentuser.others._id));
  };
  const handleSub = async () => {
    currentuser.others.subscribedUsers.includes(channel._id)
      ? await axios(`${domain}/api/users/unsubscribe/${channel._id}`, {
          method: "PUT",
          headers: { token: `Bearer ${currentuser.accessToken}` },
        })
      : await axios(`${domain}/api/users/subscribe/${channel._id}`, {
          method: "PUT",
          headers: { token: `Bearer ${currentuser.accessToken}` },
        });
    dispatch(subscription(channel._id));
  };
  const handleUpdate = async (e: any) => {
    const video = e.target;
    const currentTime = video.currentTime;
    const duration = video.duration;
    if (currentvideo.viewers.includes(currentuser?.others?._id)) {
      return null;
    } else {
      if (currentTime / duration >= 0.1) {
        await axios(`${domain}/api/videos/view/${currentvideo._id}`, {
          method: "PUT",
          headers: { token: `Bearer ${currentuser.accessToken}` },
        });
      }
    }
  };
  useEffect(() => {
    !currentuser && navigate("/signin");
  }, []);
  return (
    <>
      <Container className="md:flex-row">
        <Content>
          <VideoWrapper>
            <VideoFrame
              onTimeUpdate={(e) => handleUpdate(e)}
              src={currentvideo?.videoURL}
              controls
            />
          </VideoWrapper>
          <Title>{currentvideo?.title}</Title>
          <Details>
            <Info>
              {currentvideo?.views} views ??? {format(currentvideo?.createdAt)}
            </Info>
            <Buttons>
              <Button onClick={handleLike}>
                {currentvideo &&
                currentvideo.likes.includes(currentuser?.others._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon className="" />
                )}
                {currentvideo && currentvideo.likes.length}
              </Button>
              <Button onClick={handleDislike}>
                {currentvideo &&
                currentvideo.dislikes?.includes(currentuser?.others._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon className="" />
                )}
                {/* <ThumbDownOffAltOutlinedIcon /> */}
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
              <Image className="mybackground" src={channel?.img} />
              <ChannelDetail>
                <ChannelName>{channel?.username}</ChannelName>
                <ChannelCounter>
                  {channel?.subscribers} subscribers
                </ChannelCounter>
                <Description>{currentvideo?.desc}</Description>
              </ChannelDetail>
            </ChannelInfo>
            <div className="flex-1 my-[20px] md:my-[0px] flex justify-center">
              {currentuser?.others._id !== channel?._id && (
                <Subscribe onClick={handleSub} className="w-[100%] sm:w-[100%]">
                  {currentuser?.others.subscribedUsers?.includes(channel?._id)
                    ? "SUBSCRIBED"
                    : "SUBSCRIBE"}
                </Subscribe>
              )}
            </div>
          </Channel>
          <Hr />
          <Comments videoID={path} />
        </Content>
        <Recommendation className="flex flex-col items-center mb-[30px] justify-center max-w-[100%] ">
          {recommendedvideos.length && (
            <p className="text-white mb-[10px]">Recommended Videos</p>
          )}
          <div className="flex md:items-center justify-center flex-row md:flex-col w-[100%] overflow-x-scroll px-[10px] ">
            {randomvideos
              .filter((element: any) => element?._id !== currentvideo?._id)
              .map((video, index) => (
                <Recommended key={index} video={video} />
              ))}
          </div>
        </Recommendation>
      </Container>
    </>
  );
};

export default Video;
