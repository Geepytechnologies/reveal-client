import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useDispatch} from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../utils/userSlice";
import {auth, provider} from "../firebase"
import {signInWithPopup} from "firebase/auth"
import { Link, Path } from "react-router-dom";
import google from "../img/google.png"


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* background-color: ${({ theme }) => theme.bgLighter}; */
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

/* const Link = styled.span`
  margin-left: 30px;
`;
 */
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async(e: { preventDefault: () => void; }) =>{
    e.preventDefault();
    dispatch(loginStart())
    try{
      const res = await axios.post("api/auth/signin",{username,password});
      localStorage.setItem("access", res.data.token);
      dispatch(loginSuccess(res.data))
    }catch(err){
      dispatch(loginFailure())
    }
  }
  const signInWithGoogle = async ()=>{
    dispatch(loginStart());
    signInWithPopup(auth, provider)
     .then((result)=>{
      axios.post("api/auth/googleauth", {
        username: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL
      }).then((res)=>{
        dispatch(loginSuccess(res.data))
      })
     })
     .catch((error)=>{
       dispatch(loginFailure());
     });
  }
  return (
    <Container>
      <Wrapper className="mybackground">
        <Title>Sign in</Title>
        <SubTitle>to continue to CinematicView</SubTitle>
        <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign Up with <span><img src={google} alt="google" /></span></Button>
        <div>
          <p>Don&apos;t have an account? <Link to={"/signUp"}><span><button>Sign up</button></span></Link></p>
        </div>
        <More>
          English(USA)
          <div className="ml-[50px]">
            <p >Help</p>
            <p >Privacy</p>
            <p>Terms</p>
          </div>
        </More>
      </Wrapper>
    </Container>
  );
};

export default SignIn;