import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import {useDispatch} from "react-redux";
import Videoskeleton from "../components/skeletons/Videoskeleton";


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
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const domain = import.meta.env.VITE_DOMAIN;
  useEffect(()=>{
     const fetchVideos = async ()=>{
      setLoading(true);
      // dispatch(fetchStart());
      const res = await axios.get(`${domain}/api/videos/${type}`);
      setVideos(res.data);
      setLoading(false);
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