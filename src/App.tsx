import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import './App.css';
import Smallmenu from "./components/Smallmenu";
import RecommendedVideos from "./pages/RecommendedVideos";
import Page404 from "./components/Page404";
import SignUp from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, logout } from "./utils/userSlice";
import { persistor } from "./utils/store";
import Cookies from "js-cookie";
import axios from "axios";
import Profile from "./components/Profile";
import Addvideo from "./components/Addvideo";

const Container = styled.div`
 display: flex;
  width: 100%;
`;

const Main = styled.div`
  flex: 4;
  width: 100%;
`;
const Wrapper = styled.div`
flex: 4;
width: 50%;
background-color: ${({ theme }) => theme.bg};
  /* padding: 22px 96px; */
`;

function App() {
  // const [darkMode, setDarkMode] = useState(true);
  const {darkMode} = useSelector((state:any) => state.mode);
  const dispatch = useDispatch();
  const domain = import.meta.env.VITE_DOMAIN;

  useEffect(()=>{
    const checkuser = async ()=>{
      try{
        await axios.get(`${domain}/api/users`, {withCredentials: true})
      }catch(error: any){
        dispatch(logout());
      }
    }
    checkuser();
  },[])

  /* useEffect(()=>{
    setTimeout(()=>{
      persistor.purge();
    }, 60 * 1000);
  },[]) */
  
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <BrowserRouter>
        <Container>
          <Menu  />
          <Main>
            <Navbar />
            <div className="flex relative w-[100%]">
              <Smallmenu  />
              <Wrapper>
                <Routes>
                  <Route path="*" element={<Page404 />} />
                  <Route  path="/">
                    <Route index element={<Home type="random" />} />
                    <Route path="*" element={<Page404 />} />
                    <Route path="trending" element={<Home type="trending" />} />
                    <Route path="subscriptions" element={<Home type="subscribedVideos" />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="signUp" element={<SignUp />} />
                    <Route path="upload" element={<Addvideo />} />
                    <Route path="videos">
                      <Route path=":id" element={<Video />} />
                    </Route>
                    <Route path="videos/recommended">
                      <Route path=":id" element={<RecommendedVideos />} />
                    </Route>
                  </Route>
                </Routes>
              </Wrapper>
            </div>
          </Main>
        </Container>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;