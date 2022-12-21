import React, { useEffect, useState } from "react";
import styled from "styled-components";
import eyedrop from "../img/eyedrop.png";
import {format} from "timeago.js";
import axios from "axios";


const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

type Props = {
  comment: any
}

const Comment: React.FunctionComponent<Props> = ({comment}) => {
  const domain = import.meta.env.VITE_DOMAIN;
  const [user, setUser] = useState<any>();
  useEffect(()=>{
   const getuser = async ()=>{
    try{
      const response = await axios.get(`${domain}/api/users/find/${comment.userID}`)
      setUser(response.data)
    }catch(err){
       
    }
   }
   getuser();
  },[comment.userID])
  /* console.log(user); */
  return (
    <Container>
      <Avatar src={user?.img} />
      <Details>
        <Name>
          {user?.username} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
          {comment.text}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;