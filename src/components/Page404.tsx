import React from 'react'
import { redirect , Navigate} from "react-router-dom";
import { useState, useEffect } from 'react';

type Props = {}

const Page404 = (props: Props) => {
    const [count, setCount] = useState(10);
    const reduce = ()=>{
        setCount(count - 1);
    }
    useEffect(()=>{
        const interval = setInterval(reduce, 1000);
        return ()=> clearInterval(interval)
    })
  return (
    <>
    <div className='flex flex-col h-screen items-center justify-center text-white text-[40px]'>
        Page404
    <p className='text-white'>Redirecting you back to home page in {count} seconds</p>
    </div>
    </>
  )
}

export default Page404;