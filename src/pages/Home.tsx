import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import Videoskeleton from "../components/skeletons/Videoskeleton";
import { requestStart, requestSuccess, requestFailure } from "../utils/request";


const Container = styled.div`
  /* display: flex;
  flex-direction: column; */
  /* justify-content: space-between;
  align-items: center; */
  /* flex-wrap: wrap; */
  background-color: ${({ theme }) => theme.bg};
`;

interface props {
  _id : String;
}

const Home = ({type}:any) => {
  const dispatch = useDispatch();
  const {message}  = useSelector((state:any)=>state.request.errormessage);
  const {loading}  = useSelector((state:any)=>state.request);

  const [videos, setVideos] = useState([]);

  const domain = import.meta.env.VITE_DOMAIN;
  useEffect(()=>{
     const fetchVideos = async ()=>{
      try{
        dispatch(requestStart());
        const res = await axios.get(`${domain}/api/videos/${type}`);
        dispatch(requestSuccess());
        setVideos(res.data);
      }catch(err){
        dispatch(requestFailure(err))
      }
     }
     fetchVideos();
  },[type])
  return (
    <>
    {loading ? <Videoskeleton /> : 
    <Container className="grid grid-cols-1 md:grid-cols-1 justify-items-center lg:grid-cols-2 gap-4">
      {videos.map((video:props) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>}
    </>
  );
};

export default Home;