import React, {useState} from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { toggleMenu } from "../utils/menuSlice";
import myimage from "../img/geepy.jpg"

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  width: 100%;
  z-index: 100;
  `;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid var(--secondary);
  color: var(--secondary);
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  /* background-color: #999; */
  object-fit: cover;
`;

const Navbar = () => {
  const {currentuser}  = useSelector((state:any)=>state.user);
  const dispatch = useDispatch();
  return (
    <Container>
      <Wrapper>
        <div onClick={()=>dispatch(toggleMenu())} className="flex md:hidden">
          <MenuIcon className="text-white" />
        </div>
        <Search className="hidden md:flex">
          <Input placeholder="Search" />
          <SearchOutlinedIcon className="text-white" />
        </Search>
        {currentuser ? (
          <User>
            <VideoCallOutlinedIcon />
            <div className="w-[32px] relative h-[32px] mybackground rounded-full">
               <div className="absolute w-[100%] h-[100%] rounded-full top-0 flex items-center justify-center">
                <p>{currentuser.others.username?.slice(0,1)}</p>
                </div>
               <Avatar src={currentuser.others.img} />
            </div>
            <p className="text-white">{currentuser.others.username}</p>
          </User>
        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
          <Button>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Button>
        </Link>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;