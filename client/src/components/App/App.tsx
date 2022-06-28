import "./App.css";
import UploadImage from "../UploadImage/UploadImage";
import { useState } from "react";

function App() {
  return (
    <div className="app">
      <h1>Upload your image</h1>
      <h4>Files should be Jpeg, Png,....</h4>
      <UploadImage/>

    </div>
  );
}

export default App;
