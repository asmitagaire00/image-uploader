import { useRef, useState } from "react";
import axios from "axios";

import UploadedItem from "../UploadedItem/UploadedItem";
import "./UploadImage.css";
import Loader from "../Loader/Loader";

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const [browseButtonClicked, setBrowseButtonClicked] =
    useState<boolean>(false);
  const [uploadButtonClicked, setUploadButtonClicked] =
    useState<boolean>(false);
  const [copyLink, setCopyLink] = useState(null);
  const [allowDropChangeBorder, setAllowDropChangeBorder] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setAllowDropChangeBorder(true);
  };

  const leaveDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAllowDropChangeBorder(false);
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadButtonClicked(false);

    const imageFile = e.dataTransfer.files[0];
    setFile(imageFile);

    handleUpload(e);
  };

  const handleUpload = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setBrowseButtonClicked(false);
    setUploadButtonClicked(true);
    setLoading(true);

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      try {
        await axios.post("/upload", data).then(({ data }) => {
          console.log("data", data);
          setCopyLink(data);
        });

        setLoading(false);
      } catch (err) {
        console.log("error occured in uploads", err);
      }
    }
  };

  const handleBrowseButton = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setBrowseButtonClicked(true);
    inputFile?.current?.click();
  };

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div
      onDrop={drop}
      onDragOver={allowDrop}
      onDragLeave={leaveDrop}
      className="upload-image-container"
    >
      <div className="upload-image-title">
        <h2>Upload your image</h2>
        <h4>Files should be Jpeg, Png,....</h4>
      </div>

      <UploadedItem
        file={file}
        setFile={setFile}
        uploadButtonClicked={uploadButtonClicked}
        copyLink={copyLink}
        allowDropChangeBorder={allowDropChangeBorder}
      />

      <div className="upload-image-form-container">
        <form action="/upload" onSubmit={handleUpload} method="post">
          <input
            type="file"
            name="file"
            id="upload"
            accept=".jpg, .jpeg, .png, .webp"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files != null && setFile(e.target.files[0])
            }
          />
          {!uploadButtonClicked && !browseButtonClicked && (
            <span className="text">or</span>
          )}
          <button className="browse-button-show" onClick={handleBrowseButton}>
            Choose a file
          </button>

          {file && !uploadButtonClicked ? (
            <button type="submit" style={{ marginTop: "10px" }}>
              Upload
            </button>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
