import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import {CiPlay1} from "react-icons/ci";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";


const Container = styled.div`
  flex: 1;
  /* background-color: ${({ theme }) => theme.bg}; */
  background: linear-gradient(
  45deg,
  hsl(350deg 87% 53%) 0%,
  hsl(340deg 90% 51%) 21%,
  hsl(334deg 90% 51%) 30%,
  hsl(328deg 85% 53%) 39%,
  hsl(321deg 75% 55%) 46%,
  hsl(310deg 62% 55%) 54%,
  hsl(292deg 56% 58%) 61%,
  hsl(272deg 67% 64%) 69%,
  hsl(250deg 78% 69%) 79%,
  hsl(228deg 90% 67%) 100%
);
  height: 100vh;
  display: flex;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  overflow-y: scroll;
  max-width: 50px;
  min-width: 50px;
  position: sticky;
  border-right: 2px solid ${({ theme }) => theme.soft};
  top: 0px;
   //md
   @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  /* padding: 18px 26px; */
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: 700;
  font-size: 35px;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  //md
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid var(--secondary);
  color: var(--secondary);
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

interface props {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Smallmenu = ({ darkMode, setDarkMode }:props) => {
  const {show} = useSelector((state:any)=>state.menu);
  return (
    <>
      {show && <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <CiPlay1 />
          </Logo>
        </Link>
        <Item>
          <HomeIcon />
          {/* Home */}
        </Item>
        <Item>
          <ExploreOutlinedIcon />
          {/* Explore */}
        </Item>
        <Item>
          <SubscriptionsOutlinedIcon />
          {/* Subscriptions */}
        </Item>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          {/* Library */}
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          {/* History */}
        </Item>
        <Hr />
        {/* <Title>EXPLORE</Title> */}
        <Item>
          <LibraryMusicOutlinedIcon />
          {/* Music */}
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          {/* Sports */}
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          {/* Gaming */}
        </Item>
        <Item>
          <MovieOutlinedIcon />
          {/* Movies */}
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          {/* News */}
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          {/* Live */}
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          {/* Settings */}
        </Item>
        <Item>
          <FlagOutlinedIcon />
          {/* Report */}
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          {/* Help */}
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
      </Container>}
  
  </>
  );
};

export default Smallmenu;