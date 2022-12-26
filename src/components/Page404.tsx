import React from 'react'
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import styled from "styled-components";


type Props = {}

const Text = styled.p`
    color: ${({ theme }) => theme.text};
`;

const Page404 = (props: Props) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(10);
    const reduce = ()=>{
        setCount(count - 1);
        count === 1 && navigate('/')
    }
    useEffect(()=>{
        const interval = setInterval(reduce, 1000);
        return ()=> clearInterval(interval)
    })
  return (
    <>
    <div className='flex flex-col h-screen items-center justify-center text-white text-[40px]'>
      <div className="bg-[url('robot.GIF')] bg-cover bg-no-repeat h-[400px] w-[100%] "></div>
        <Text className='text-[18px] font-[600] rounded-xl mybackground mt-[20px] p-[10px]'>Oops!!! The page You are Looking for Could not be found</Text>
      <Text className='text-[16px] mt-[6px]'>Redirecting you back to home page in <span className='font-[600] text-[18px] text-[var(--secondary)]'>{count}</span> seconds</Text>
    </div>
    </>
  )
}

export default Page404;