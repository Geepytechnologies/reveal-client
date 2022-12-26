import React, { MouseEventHandler, useEffect, useState } from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/userSlice';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { assign } from '../utils/deletevideo';
import { fetchFailure, fetchStart, fetchSuccess } from '../utils/uservideos';


function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

type Props = {}

const Logout = styled.button`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.off};
`;
const Username = styled.p`
  color: ${({ theme }) => theme.text};
`;
const Userimg = styled.img`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.off};
`;
const Subs = styled.div`
   display: flex;
`;
const SubsText = styled.p`
    color: ${({ theme }) => theme.text};
    margin-left: 5px;
`;
const Text = styled.p`
    color: ${({ theme }) => theme.text};
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;


const Profile = (props: Props) => {
    const domain = import.meta.env.VITE_DOMAIN;
    const {currentuser}  = useSelector((state:any)=>state.user);
    const {darkMode}  = useSelector((state:any)=>state.mode);
    const {videoid}  = useSelector((state:any)=>state.delete);
    const {videos}  = useSelector((state:any)=>state.uservideos);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = ()=>{
        dispatch(logout());
        navigate('/');
    }
    // const [videos, setVideos] = useState<any>();
    useEffect(()=>{
      const getVideos = async ()=>{
        try{
        dispatch(fetchStart());
        const res = await axios.get(`${domain}/api/users/find/videos/${currentuser._id}`);
        dispatch(fetchSuccess(res.data))
        // setVideos(res.data);
        }catch(err){
            dispatch(fetchFailure())
        }
      }
      getVideos();
    },[])
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (id: any) => {
    dispatch(assign(id));
    handleClickOpen();
  };
  const deletevideo = async ()=>{
    await axios.delete(`${domain}/api/videos/${videoid}`, {withCredentials: true});
    handleClose();
    navigate(0);
  }
  return (
    <>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"This Video will be deleted!!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="bg-[var(--secondary)] text-white py-[8px] rounded-xl px-[15px]" onClick={deletevideo}>Yes</button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    <div className=' flex flex-col pb-[50px] '>
        <div className="w-[100%] blur-[2px]  border-white min-h-[300px] bg-[url('cinematicview.png')] bg-center ">
        </div>
        <div className='flex gap-3 flex-col z-[50] mt-[-40px] w-[80%]'>
            <div className='flex flex-col'>
                <Userimg className='h-[150px] border-2 border-white rounded-full w-[150px]' src={currentuser.img} alt="Profile" />
                <Username className='font-[600]'>{currentuser.username}</Username>
            </div>
            <Text>{currentuser.email}</Text>
            <Subs>
                <SubscriptionsIcon className={darkMode ? "text-white" : "text-black"}  />
                <SubsText>{currentuser.subscribers} subscribers</SubsText>
            </Subs>
            <div className='flex cursor-pointer rounded-lg w-[200px] px-[5px] py-[10px] bg-[var(--aux1)]'>
              <EditIcon className="text-white mr-[5px]" />
              <Text>Edit Profile</Text>
            </div>
            <Hr />
            {/* my uploads */}
            <div>
                <Text className='font-[600] mb-[5px]'>My Uploads</Text>
                {!videos.length && <Text>You don&apos;t have any Video yet</Text>}
                <div className='mt-[10px]'>
                    {/* map */}
                    {videos && videos.map((video: any)=>
                    <>
                    <div className='flex '>
                       <div className='h-[100px] w-[100px] mr-[10px]'>
                        <img src={video?.imgURL} className="w-[100%] h-[100%]" />
                       </div>
                       <div className='flex flex-col justify-between'>
                        <Text className='font-[600]'>{video?.title}</Text>
                        <Text className='text-[16px] font-[400]'>{video?.desc}</Text>
                        <div className='flex'>
                           <VisibilityIcon className={darkMode ? "text-white" : "text-black"} />
                           <Text className='text-[14px] ml-[5px]'>{video?.views} Views</Text>
                        </div>
                        <DeleteIcon onClick={()=>handleOpen(video._id)}  className='text-[var(--secondary)] mt-[10px]' />
                       </div>
                    </div>
                    <Hr className='' />
                    </>
                    )}
                </div>
            </div>
            <Logout className='rounded-lg w-[200px] px-[5px] py-[10px]' onClick={handleClick}>Logout</Logout>
        </div>
    </div>
    </>
  )
}

export default Profile