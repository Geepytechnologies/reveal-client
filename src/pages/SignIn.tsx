import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useDispatch} from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../utils/userSlice";
import {auth, provider} from "../firebase"
import {signInWithPopup} from "firebase/auth"
import { Link, Path, useNavigate } from "react-router-dom";
import google from "../img/google.png"
const domain = import.meta.env.VITE_DOMAIN;



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* background-color: ${({ theme }) => theme.bgLighter}; */
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  margin: 20px 0px;
  /* gap: 10px; */
  height: auto;
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
  margin: 10px 0px;
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
type UserCredential = {
  _tokenResponse: any
}

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async(e: { preventDefault: () => void; }) =>{
    e.preventDefault();
    dispatch(loginStart())
    try{
      const res = await axios.post(`${domain}/api/auth/signin`,{username,password},{
        withCredentials: true,
      })
      dispatch(loginSuccess(res.data))
      navigate('/');
    }catch(err){
      dispatch(loginFailure())
    }
  }
  const signInWithGoogle = async ()=>{
    dispatch(loginStart());
    // signInWithPopup(auth, provider)
    //  .then((result)=>{
    //   setUsername(String(result.user.displayName));
    //   setImg(String(result.user.photoURL));
    //   setEmail(String(result.user.email));
    //  }).then(()=>{
    //   axios.post(`${domain}/api/auth/googleauth`,{username,img,email});
    //  }).then((res)=>{
    //   // dispatch(loginSuccess(res.data));
    //   console.log(res)
    //  })
    //  const res = await signInWithPopup(auth, provider)
    //  setUsername(String(res.user.displayName));
    // setImg(String(res.user.photoURL));
    // setEmail(String(res.user.email));
    // if(username){
      try{
      const user = await axios.post(`${domain}/api/auth/googleauth`,{username: "Geepy"});
      if(user){
        dispatch(loginSuccess(user.data))
        navigate('/');
        console.log(user.data)
        // console.log({username, img, email})
      }
    }catch(err){
      dispatch(loginFailure())
    }
  // }
    // signInWithPopup(auth, provider)
    //  .then((result)=>{
    //   axios.post(`${domain}/api/auth/googleauth`, {
    //     username: result.user.displayName,
    //     email: result.user.email,
    //     img: result.user.photoURL
    //   }).then((res)=>{
    //     dispatch(loginSuccess(res.data));
    //     navigate('/');  
    //   })
    //  })
    //  .catch((error)=>{
    //    dispatch(loginFailure());
    //  });
  }
  return (
    <Container>
      <Wrapper className="mybackground">
        <Title>Sign in</Title>
        <SubTitle>to Reveal</SubTitle>
        <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <div className="cursor-pointer rounded-xl bg-[white] text-[#999] w-[90%] flex items-center justify-center" onClick={signInWithGoogle}>continue with <span><img className="w-[20px] h-[20px] ml-[5px]" src={google} alt="google" /></span></div>
        <div className="mt-[5px]">
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


