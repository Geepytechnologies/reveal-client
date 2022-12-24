import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/userSlice';


type Props = {}

const Profile = (props: Props) => {
    const {currentuser}  = useSelector((state:any)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = ()=>{
        dispatch(logout());
        navigate('/');
    }
  return (
    <div className='h-[100vh] flex justify-center'>
        <div className='flex flex-col w-[80%]'>
            <div className='flex flex-col'>
                <img className='h-[100px] w-[100px]' src={currentuser.img} alt="Profile" />
                <p className='text-white'>{currentuser.username}</p>
            </div>
            <button className='bg-[red] text-white' onClick={handleClick}>Logout</button>
        </div>
    </div>
  )
}

export default Profile