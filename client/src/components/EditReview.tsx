import { useState, useContext, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadImage from "./UploadImage";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import ReviewService from "../services/ReviewService";
import { Snackbar, Alert, Slide } from "@mui/material";
import MdxEditor from "./MdxEditor";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const EditReview = () => {
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getReview();
    getTags();
  }, []);

  const { store } = useContext(Context);
  let userId = 0;

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/");
  const userIndex = pathParts.indexOf("user");
  userId = +pathParts[userIndex + 1];

  const [reviewId, setReviewId] = useState(0);
  const [title, setTitle] = useState("");
  const [nameofart, setNameofart] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [authorRating, setAuthorRating] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMdxVisible, setIsMdxVisible] = useState(false);

  const getReview = async () => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const reviewsIndex = pathParts.indexOf("reviews");
    const id = +pathParts[reviewsIndex + 1];
    setReviewId(id);

    try {
      const response = await ReviewService.fetchReview(id);
      const data = response.data;
      console.log(data.userId);
      if (
        response.data === null ||
        (store.user.role !== "admin" && store.user.id != data.userId) ||
        userId !== store.user.id
      )
        navigate("/404");
      setTitle(data.title);
      setNameofart(data.nameofart);
      setCategory(data.category);
      setText(data.text);
      setTags(data.tags);
      setAuthorRating(String(data.authorRating));
      setImage(data.img);
      setIsMdxVisible(true);
    } catch (e) {
      console.log(e);
    }
  };

  const getTags = async () => {
    try {
      const response = await ReviewService.fetchTags();
      const getAllTags = [...new Set(response.data.map((e) => e.tags))];
      setAvailableTags(getAllTags);
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageChange = (url: string) => {
    setImage(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const status = "published";
      const response = await ReviewService.updateReview(
        reviewId,
        title,
        nameofart,
        category,
        tags,
        text,
        image,
        +authorRating,
        status
      );
      if (response.status === 200) {
        setSuccessMessage("Review successfully updated!");
        setTimeout(() => {
          navigate(
            `/user/${
              store.user.role !== "admin" ? store.user.id : userId
            }/reviews`
          );
        }, 2500);
      }
    } catch (e) {
      setErrorMessage(String(e));
      console.log(e);
      throw e;
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <h2>Edit Review</h2>
          <div className="col-md-8">
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
              {isMdxVisible && <MdxEditor text={text} setText={setText} />}
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
              <Autocomplete
                onChange={(_, value) => {
                  const newValue = value.join(",");
                  setTags(newValue);
                  console.log(newValue);
                }}
                value={tags ? tags.split(",") : []}
                multiple
                id="tags-filled"
                options={availableTags}
                freeSolo
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Author Rating
              </label>
              <input
                type="number"
                className="form-control"
                id="rating"
                name="rating"
                min={0}
                max={10}
                value={authorRating}
                onChange={(e) => setAuthorRating(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4 text-center">
            <label className="form-label">Review Image</label>
            <UploadImage
              handleImageChange={handleImageChange}
              image={image}
              reviewId={reviewId}
            />
          </div>
          <div className="mt-3 text-center">
            <button type="submit" className="btn btn-primary">
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
      </form>
    </div>
  );
};

export default observer(EditReview);
