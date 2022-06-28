import "./UploadedItem.css";
interface Props {
  file: any;
  setFile: any;
  uploadButtonClicked:boolean;
  copyLink:any;
}

const UploadedItem: React.FC<Props> = ({ file, setFile, uploadButtonClicked,copyLink }) => {
  const uri=`${process.env.REACT_APP_BACKEND_URL}${copyLink}}`;
  return (
    <div className="uploaded-item">
      {file && (
        <div className="shareImgContainer">
          <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
          <div className="shareCancelImg" onClick={() => setFile(null)}>
            cancel
          </div>
         {uploadButtonClicked && <div>
            <input type="text" value={uri} />
            <button>Copy Link</button>
          </div>}
        </div>
      )}
    </div>
  );
};

export default UploadedItem;
