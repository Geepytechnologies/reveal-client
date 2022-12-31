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
    <div className='flex flex-col h-screen items-center'>
      <div className="bg-[url('/404.jpg')] bg-center bg-cover bg-no-repeat h-[300px] sm:h-[350px] md:h-[400px] w-[100%] "></div>
      <div className='w-[90%]'>
        <Text className='text-[15px] text-center md:text-[18px] font-[600] rounded-xl mybackground mt-[20px] p-[10px]'>Oops!!! The page You are Looking for Could not be found</Text>
      <Text className='text-[15px] md:text-[18px] mt-[6px]'>Redirecting you back to home page in <span className='font-[600] text-[18px] md:text-[28px] text-[var(--secondary)]'>{count}</span> seconds</Text>
      </div>
    </div>
    </>
  )
}

export default Page404;