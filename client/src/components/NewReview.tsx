import { useState, useContext, FormEvent, useEffect, useRef } from "react";
import UploadImage from "./UploadImage";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import ReviewService from "../services/ReviewService";
import { Snackbar, Slide, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MdxEditor from "./MdxEditor";
import UserService from "../services/UserService";

const NewReview = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  let id = 0;
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/");
  const userIndex = pathParts.indexOf("user");
  id = +pathParts[userIndex + 1];

  const [title, setTitle] = useState("");
  const [nameofart, setNameofart] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [authorRating, setAuthorRating] = useState("");
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const titleRef = useRef("");
  const nameofartRef = useRef("");
  const categoryRef = useRef("");
  const textRef = useRef("");
  const tagsRef = useRef("");
  const authorRatingRef = useRef("");
  const imageRef = useRef("");
  const isPublished = useRef(false);
  const btnClick = useRef(false);

  useEffect(() => {
    getUser(id);
    // if (store.user.role !== "admin" && store.user.id != id) navigate("/404");
    return () => {
      const fieldsToCheck = [
        titleRef.current,
        nameofartRef.current,
        categoryRef.current,
        textRef.current,
        tagsRef.current,
        authorRatingRef.current,
        0,
        0,
      ];

      if (!isPublished.current && fieldsToCheck.some((field) => field !== "")) {
        store.setSaving(true);
        handleDraft();
      }
    };
  }, []);

  const getUser = async (id: number) => {
    try {
      const response = await UserService.fetchUser(id);
      console.log(response.data);
      if (
        response.data === null ||
        (store.user.role !== "admin" && store.user.id != id)
      )
        navigate("/404");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDraft = async (status: "draft" | "published" = "draft") => {
    try {
      await ReviewService.addReview(
        titleRef.current,
        nameofartRef.current,
        categoryRef.current,
        tagsRef.current,
        textRef.current,
        imageRef.current,
        +authorRatingRef.current,
        0,
        0,
        status,
        id
      );
      store.setSaving(false);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  const handleImageChange = (url: string) => {
    setImage(url);
    imageRef.current = url;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Lick");
    if (e.target instanceof HTMLElement) {
      // console.log(e.target);
      if (btnClick.current) {
        try {
          const status = "published";
          const response = await ReviewService.addReview(
            title,
            nameofart,
            category,
            tags,
            text,
            image,
            +authorRating,
            0,
            0,
            status,
            id
          );
          if (response.status === 200) {
            setSuccessMessage("Review successfully created!");
            isPublished.current = true;
            setTimeout(() => {
              navigate(`/user/${id}/reviews`);
            }, 2500);
          }
        } catch (e) {
          setErrorMessage(String(e));
          console.log(e);
          throw e;
        }
      }
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <h2>Add New Review</h2>
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
                onChange={(e) => {
                  const value = e.target.value;
                  setTitle(value);
                  titleRef.current = value;
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Text
              </label>
              <MdxEditor
                text={text}
                setText={setText}
                textRef={textRef}
                btnClick={btnClick}
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
                onChange={(e) => {
                  const value = e.target.value;
                  setNameofart(value);
                  nameofartRef.current = value;
                }}
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
                onChange={(e) => {
                  const value = e.target.value;
                  setCategory(value);
                  categoryRef.current = value;
                }}
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
                onChange={(e) => {
                  const value = e.target.value;
                  setTags(value);
                  tagsRef.current = value;
                }}
                required
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
                onChange={(e) => {
                  const value = e.target.value;
                  setAuthorRating(value);
                  authorRatingRef.current = value;
                }}
                required
              />
            </div>
          </div>
          <div className="col-md-4 text-center">
            <label className="form-label">Review Image</label>
            <UploadImage handleImageChange={handleImageChange} image={image} />
          </div>
          <div className="mt-3 text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => (btnClick.current = true)}
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
      </form>
    </div>
  );
};

export default observer(NewReview);
