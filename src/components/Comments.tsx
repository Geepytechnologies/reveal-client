import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import eyedrop from "../img/eyedrop.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { getCookie } from "../utils/cookie";
import Cookies from "js-cookie";

const Container = styled.div`
padding: 5px;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #e6e6e6;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

interface props {
  videoID: string;
}

const Comments = ({videoID}:props) => {
  const {currentuser}  = useSelector((state:any)=>state.user);
  const [comment, setComment] = useState<any>([]);
  const [commentadded, setCommentadded] = useState(false)
  const [addcomment, setAddComment] = useState<String>();
  const domain = import.meta.env.VITE_DOMAIN;
  useEffect(()=>{
    const fetchComments = async ()=>{
      try{
        const response = await axios.get(`${domain}/api/comments/${videoID}`)
        setComment(response.data)
      }catch(err){
        // console.log(err);
      }

    }
    fetchComments()
  },[videoID,commentadded]);
  const postComment = async ()=>{
    
    /* const config = {
      headers: { Authorization: `Bearer ${storage.getToken()}` }
    };
     try{
        const response = await axios.post(`http://localhost:5000/api/comments`, {
          text: addcomment,
          userID: currentuser._id,
          videoID: videoID
        }, config);
        console.log(response.data)
        setCommentadded(!commentadded)
        console.log(commentadded)
     }catch(err){
        // console.log(err);
     } */
  }
  return (
    <Container>
      <NewComment>
        <Avatar className="mybackground" src={currentuser.others.img} />
        <div className="flex items-center">
        <Input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setAddComment(e.target.value)} placeholder="Add a comment..." />
        <button onClick={postComment} className="bg-[#ef1e41] ml-[15px] min-w-[70px] text-white rounded-xl px-[7px] py-[10px] ">Post</button>
        </div>
      </NewComment>
      {comment?.map((comment: { _id: React.Key | null | undefined;}) =>
          <Comment key={comment._id} comment={comment} />
        )
      }
    </Container>
  );
};

export default Comments;