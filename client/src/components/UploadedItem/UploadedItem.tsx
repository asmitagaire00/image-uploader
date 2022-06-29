import "./UploadedItem.css";

interface Props {
  file: any;
  setFile: any;
  uploadButtonClicked: boolean;
  copyLink: any;
  allowDropChangeBorder: boolean;
}

const UploadedItem: React.FC<Props> = ({
  file,
  allowDropChangeBorder,
  uploadButtonClicked,
  copyLink,
}) => {
  const uri = `${process.env.REACT_APP_BACKEND_URL}${copyLink}`;

  const handleClickedLink = () => {
    let copyText = document.getElementById(
      "share-img-link"
    ) as HTMLInputElement;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  };

  return (
    <div
      className={
        file || allowDropChangeBorder
          ? "uploaded-item-solid"
          : "uploaded-item-dashed"
      }
    >
      {file ? (
        <div className="shareImgContainer">
          <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
          {uploadButtonClicked && copyLink && (
            <div className="share-img-input-container">
              <input
                className="share-img-input"
                id="share-img-link"
                type="text"
                defaultValue={uri}
              />
              <button onClick={handleClickedLink}>Copy Link</button>
            </div>
          )}
        </div>
      ) : (
        <div className="uploaded-image-text-container">
          <img
            src="assets/image.svg"
            alt="image_drag_drop"
            className="image-drag-drop"
          />
          <h6 className="drag-drop-h6">Drag & drop your image here</h6>
        </div>
      )}
    </div>
  );
};

export default UploadedItem;
