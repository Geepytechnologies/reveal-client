import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import {useDispatch} from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../utils/userSlice";
import {auth, provider} from "../firebase"
import {signInWithPopup} from "firebase/auth"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import google from "../img/google.png"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


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
  /* border: 1px solid ${({ theme }) => theme.soft}; */
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  outline: none;
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

const Link = styled.span`
  margin-left: 30px;
`;



const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [emaildata, setEmaildata] = useState("");
  const [emaildataErrMsg, setEmaildataErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [showpassword, setShowpassword] = useState(false);
  const dispatch = useDispatch();
  const domain = import.meta.env.VITE_DOMAIN;
  const apikey = import.meta.env.VITE_EMAIL_API_KEY;


  const Loader = ()=>{
    return (
        <BeatLoader
        color={"white"}
        loading={loading}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    )
}
  const handleLogin = async(e: { preventDefault: () => void; }) =>{
    e.preventDefault();
    setLoading(true);
    await confirmEmail();
    if(emaildata == "UNDELIVERABLE"){
        setEmailError(true);
        setEmaildataErrMsg("Enter a valid email address");
        setLoading(false);
        return;

    }else{
        null
       /*  try{
         const res = await axios.post(`${domain}/api/auth/signup`,{username,password,email});
         console.log(res);
        }catch(err){
            console.log(err);
        } */
        setLoading(false);
    }
  }
  /* console.log({emailerr: emailError})
  console.log({loading: loading})
  console.log({emailmsg: emaildata}) */
  /* const signInWithGoogle = async ()=>{
    dispatch(loginStart());
    signInWithPopup(auth, provider)
     .then((result)=>{
      axios.post(`${domain}/api/auth/googleauth`, {
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
  } */
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apikey}&email=${email}`
  const confirmEmail = async ()=>{
     await fetch(url)
     .then((response) => response.json())
     .then((data) => {setEmaildata(data.deliverability)});
  }
  const toggleVisibility = ()=>{
    setShowpassword(!showpassword)
  }
  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    if(password !== e.target.value){
        setPasswordError(true);
        setPasswordErrMsg("Passwords do not match");
    }else{
        setPasswordError(false);
        setPasswordErrMsg("");
    }
  }
  const signInWithGoogle = async ()=>{
    dispatch(loginStart());
    signInWithPopup(auth, provider)
     .then((result)=>{
      axios.post(`${domain}/api/auth/googleauth`, {
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
        <Title>Sign Up</Title>
        <p>to Reveal</p>
        <form className="w-[100%] mt-[9px] flex flex-col" onSubmit={handleLogin}>
        <div className="border w-[100%] rounded-xl border-white p-[3px]"><Input type="text" required placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/></div>
        <div className="flex mt-[10px] rounded-xl w-[100%] flex-col border border-white p-[3px]"><Input type="email" required={true}  placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        {emailError && <span className="text-[red] font-[500] text-[15px]">{emaildataErrMsg}</span>}
        <div className="flex mt-[10px] rounded-xl w-[100%] items-center border border-white p-[3px]">
        {!showpassword ? (<><Input type="password" required={true} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><div onClick={toggleVisibility}><VisibilityOffIcon  /></div></>) : 
        (<><Input type="text" required={true} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><div onClick={toggleVisibility}><VisibilityIcon  /></div></>)
       }
        </div>
        <div className="flex mt-[10px] rounded-xl w-[100%]  flex-col border border-white p-[3px]">
        <Input type="password" required placeholder="Confirm password" onChange={(e)=>checkPassword(e)} />
        </div>
        {PasswordError && <span className="text-[12px] text-center">{passwordErrMsg}</span>}
        {!loading ? <Button className="mt-[15px]" type="submit">Sign up</Button> :
        <Loader />}
        </form>
        <div className="cursor-pointer rounded-xl mt-[15px] bg-[white] text-[#999] w-[90%] flex items-center justify-center" onClick={signInWithGoogle}>continue with <span><img className="w-[20px] h-[20px] ml-[5px]" src={google} alt="google" /></span></div>
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

export default SignUp;