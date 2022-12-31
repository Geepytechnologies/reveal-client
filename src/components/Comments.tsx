import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import eyedrop from "../img/eyedrop.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addcomment, mycomments } from "../utils/comments";
const domain = import.meta.env.VITE_DOMAIN;


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
  const dispatch = useDispatch();
  const {currentuser}  = useSelector((state:any)=>state.user);
  const {commentarray}  = useSelector((state:any)=>state.comments);
  // const [comment, setComment] = useState<any>([]);
  // const [commentadded, setCommentadded] = useState(false)
  const [comment, setComment] = useState<String>();
  const domain = import.meta.env.VITE_DOMAIN;
  useEffect(()=>{
    const fetchComments = async ()=>{
      try{
        const response = await axios.get(`${domain}/api/comments/${videoID}`)
        dispatch(mycomments(response.data));
      }catch(err){
        // console.log(err);
      }

    }
    fetchComments()
  },[videoID,comment]);
  const postComment = async ()=>{
    try{
      const res = await axios.post(`${domain}/api/comments`, {text: comment, videoID}, {withCredentials:true});
      dispatch(addcomment(res.data));
    }catch(err){
       
    }
    
  }
  const deleteComment = async (id:string)=>{
    try{
      const res = await axios.delete(`${domain}/api/comments/${id}`, {withCredentials:true});
      dispatch(addcomment(res.data));
    }catch(err){
       
    }
    
  }
  return (
    <Container>
      <NewComment>
        <Avatar className="mybackground" src={currentuser?.img} />
        <div className="flex items-center">
        <Input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setComment(e.target.value)} placeholder="Add a comment..." />
        <button onClick={postComment} className="bg-[#ef1e41] ml-[15px] min-w-[70px] text-white rounded-xl px-[7px] py-[10px] ">Post</button>
        </div>
      </NewComment>
      {commentarray?.map((comment: { _id: React.Key | null | undefined;}) =>
          <Comment key={comment._id} comment={comment} />
        )
      }
    </Container>
  );
};

export default Comments;