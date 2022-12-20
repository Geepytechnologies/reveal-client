import { useState } from "react";
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
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <BrowserRouter>
        <Container>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <div className="flex relative w-[100%]">
              <Smallmenu darkMode={darkMode} setDarkMode={setDarkMode} />
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home type="random" />} />
                    <Route path="*" element={<Page404 />} />
                    <Route path="trend" element={<Home type="trend" />} />
                    <Route path="subscribed" element={<Home type="subscribed" />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signUp" element={<SignUp />} />
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