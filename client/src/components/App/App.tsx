import React, { useState } from 'react';
import axios from "axios"
import './App.css';
import Loader from '../Loader/Loader';
import UploadedItem from '../UploadedItem/UploadedItem';
import DragAndDrop from '../DragAndDrop/DragAndDrop';

function App() {
  const [file, setFile] = useState<File | null>(null  );

  const handleSubmit=async(e : React.FormEvent<EventTarget>)=>{
    e.preventDefault();

    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file)

      try{
        await axios.post("/upload", data);
      }
      catch(err){console.log("error occured in uploads",err)}
    }
  }

  return (
    <div className="app">
        <h1>Upload your image</h1>
        <h4>Files should be Jpeg, Png,....</h4>
        <DragAndDrop/>
      <form action="upload" onSubmit={handleSubmit} method="post">
        <input type="file" name="file" id="uploads" accept=".jpg, .jpeg, .png, .webp" onChange={(e)=>e.target.files != null&& setFile(e.target.files[0])}/>
        <button type='submit'>Upload</button>
      </form>
      {file && <UploadedItem file={file} setFile={setFile}/>}
    </div>
  );
}

export default App;
