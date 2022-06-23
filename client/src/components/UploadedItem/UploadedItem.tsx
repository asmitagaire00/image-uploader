import React from 'react'
import "./UploadedItem.css"
interface Props{
  file:any;
  setFile:any;
}

const UploadedItem : React.FC<Props> = ({file, setFile}) => {
  return (
    <div className='uploaded-item'>  {file && (
      <div className="shareImgContainer">
        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
        <div className="shareCancelImg" onClick={() => setFile(null)} >cancel</div>
      </div>
    )}</div>
  )
}

export default UploadedItem