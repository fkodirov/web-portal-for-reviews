import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import Dropzone from "./Dropzone";
import React, { useState } from "react";

const UploadImage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const handleUpload = (file: File) => {
    setProgress(1);
    const storageRef = ref(storage, `files/${file.name}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            console.log(downloadURL);
            setImageUrl(downloadURL);
            setProgress(0);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleDelete = () => {
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      deleteObject(imageRef)
        .then(() => {
          console.log("File deleted successfully.");
          setImageUrl("");
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
        });
    }
  };

  return (
    <>
      <Dropzone onFileUpload={handleUpload} progress={progress} />
      {imageUrl && (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="col-6">
            <img src={imageUrl} alt="Review Image" width={200} height={150} />
          </div>
          <div className="col mt-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadImage;
