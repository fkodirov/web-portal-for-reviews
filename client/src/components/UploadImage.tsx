import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import Dropzone from "./Dropzone";
import React, { useState } from "react";
import ReviewService from "../services/ReviewService";

const UploadImage: React.FC<{
  handleImageChange: (url: string) => void;
  image: string;
  reviewId?: number;
}> = ({ handleImageChange, image, reviewId }) => {
  const [progress, setProgress] = useState(0);
  const handleUpload = (file: File) => {
    setProgress(1);
    const storageRef = ref(storage, `files/${file.name}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            console.log(downloadURL);
            handleImageChange(downloadURL);
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

  const handleDelete = async () => {
    if (image) {
      if (reviewId) {
        try {
          console.log(reviewId);
          await ReviewService.deleteImage(reviewId);
        } catch (e) {
          console.log(e);
        }
      }
      const imageRef = ref(storage, image);
      deleteObject(imageRef)
        .then(() => {
          console.log("File deleted successfully.");
          handleImageChange("");
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
        });
    }
  };

  return (
    <>
      {image ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <img src={image} alt="Review Image" width={350} height={225} />

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
      ) : (
        <Dropzone onFileUpload={handleUpload} progress={progress} />
      )}
    </>
  );
};

export default UploadImage;
