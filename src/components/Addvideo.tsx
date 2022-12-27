import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from "../firebase"


/* type Props = {
    setOpen: (open: boolean) => void
} */

const Container = styled.div`
width: 100%;
background-color: #000000a7;
height: auto;
display: flex;
align-items: center;
justify-content: center;
overflow-y: scroll;
`;

const Wrapper = styled.div`
width: 100%;
height: auto;
background-color: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text};
padding: 20px;
display: flex;
flex-direction: column;
overflow-y: scroll;
gap: 20px;
margin: 40px 10px;
//md
@media screen and (min-width: 768px) {
    width: 80%;
}
`;
const Close = styled.div`
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
`;
const Title = styled.h1`
text-align: center;
`;

const Input = styled.input`
border: 1px solid ${({ theme }) => theme.text};
color: ${({ theme }) => theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
`;
const Desc = styled.textarea`
border: 1px solid ${({ theme }) => theme.text};
color: ${({ theme }) => theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
`;
const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: var(--secondary);
color: white;
`;
const Label = styled.label`
font-size: 14px;
`;
const Addvideo = () => {
  const domain = import.meta.env.VITE_DOMAIN;
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState();
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e:any) => {
    setTags(e.target.value.split(","));
  };
  const uploadFile = (file: any, urlType: string) => {
    const mydomain = "reveal.com.ng"
    const storage = getStorage(app);
    const fileName = mydomain + new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot: { bytesTransferred: number; totalBytes: number; state: any; }) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgURL" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };
  useEffect(() => {
    video && uploadFile(video , "videoURL");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgURL");
  }, [img]);
  const handleUpload = async (e: { preventDefault: () => void; })=>{
    e.preventDefault();
    const res = await axios.post(`${domain}/api/videos`, {...inputs, tags}, {withCredentials: true})
    // setOpen(false)
    res.status === 200 && navigate(`/videos/${res.data._id}`)
  }
  return (
    <Container>
      <Wrapper>
        <div className='flex items-center justify-center'>
          <div className="bg-[url('/cinematicview.png')] bg-center bg-contain h-[50px] w-[50px] mr-[10px]"></div>
          <Title className='font-[600]'>Upload a New Video</Title>
        </div>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading: " + videoPerc + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e:any) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading: " + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e:any) => setImg(e.target.files[0])}
          />
        )}
        {(imgPerc && videoPerc) !== 100 ? null : <Button onClick={handleUpload}>Upload</Button>}
      </Wrapper>
    </Container>
  )
}

export default Addvideo;


