import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadImage from "./UploadImage";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import ReviewService from "../services/ReviewService";
import { Snackbar, Alert, Slide } from "@mui/material";

const NewReview = () => {
  const { store } = useContext(Context);
  const [title, setTitle] = useState("");
  const [nameofart, setNameofart] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (url: string) => {
    setImage(url);
  };

  const handleSubmit = async () => {
    try {
      const response = await ReviewService.addReview(
        title,
        nameofart,
        category,
        tags,
        text,
        image,
        +rating,
        store.user.id
      );
      if (response.status === 200) {
        setSuccessMessage("Review successfully created!");
      }
    } catch (e) {
      setErrorMessage(String(e));
      console.log(e);
      throw e;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <h2>Add New Review</h2>
        <div className="col-md-8">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Text
              </label>
              <ReactQuill
                value={text}
                onChange={(value) => setText(value)}
                modules={quillModules}
                className="min-vh-20"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nameofart" className="form-label">
                Name of Art
              </label>
              <input
                type="text"
                className="form-control"
                id="nameofart"
                name="nameofart"
                value={nameofart}
                onChange={(e) => setNameofart(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags
              </label>
              <input
                type="text"
                className="form-control"
                id="tags"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <input
                type="number"
                className="form-control"
                id="rating"
                name="rating"
                min={0}
                max={10}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
        <div className="col-md-4 text-center">
          <label className="form-label">Review Image</label>
          <UploadImage handleImageChange={handleImageChange} image={image} />
        </div>
        <div className="mt-3 text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Publish Review
          </button>
        </div>
        <Snackbar
          open={!!successMessage}
          autoHideDuration={2000}
          onClose={() => setSuccessMessage("")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          TransitionComponent={Slide}
        >
          <Alert
            severity="success"
            onClose={() => setSuccessMessage("")}
            sx={{ width: "25%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={2000}
          onClose={() => setErrorMessage("")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          TransitionComponent={Slide}
        >
          <Alert
            severity="error"
            onClose={() => setErrorMessage("")}
            sx={{ width: "25%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

const quillModules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

export default observer(NewReview);
