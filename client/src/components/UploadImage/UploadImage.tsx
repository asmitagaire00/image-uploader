import { useRef, useState } from "react";
import axios from "axios";

import UploadedItem from "../UploadedItem/UploadedItem";
import "./UploadImage.css";

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const [browseButtonClicked, setBrowseButtonClicked] =
    useState<boolean>(false);
  const [uploadButtonClicked, setUploadButtonClicked] =
    useState<boolean>(false);
  const [copyLink, setCopyLink] = useState(null);

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("dropped", e.dataTransfer.files);
    const imageFile = e.dataTransfer.files[0];


    setFile(() => {
      return imageFile;
    });

    handleUpload(e);
  };

  const handleUpload = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    setBrowseButtonClicked(false);
    setUploadButtonClicked(true);

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
      } catch (err) {
        console.log("error occured in uploads", err);
      }
    }
    console.log("file from handleupload", file);
  };

  const handleBrowseButton = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setBrowseButtonClicked(true);
    inputFile?.current?.click();
    console.log("inputfile", inputFile?.current?.value);
  };

  return (
    <div
      onDrop={drop}
      onDragOver={allowDrop}
    >
      {file && (
        <UploadedItem
          file={file}
          setFile={setFile}
          uploadButtonClicked={uploadButtonClicked}
          copyLink={copyLink}
        />
      )}

      {!file && (
        <div>
          <img
            src="assets/image.svg"
            alt="image_drag_drop"
            className="image-drag-drop"
          />
          <h2 className="h2-drag-drop">Drag & drop your image here</h2>
        </div>
      )}
      <form action="/upload" onSubmit={handleUpload} method="post">
        <input
          type="file"
          name="file"
          id="upload"
          accept=".jpg, .jpeg, .png, .webp"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(e) => e.target.files != null && setFile(e.target.files[0])}
        />
        <button
          className={
            browseButtonClicked ? "browse-button-hide" : "browse-button-show"
          }
          onClick={handleBrowseButton}
        >
          Browse
        </button>

        {file && <button type="submit">Upload</button>}
      </form>
    </div>
  );
};

export default UploadImage;
