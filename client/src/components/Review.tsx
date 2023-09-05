// import { StarFill } from "react-bootstrap-icons";
import { useState, useContext, useEffect } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import ReviewService from "../services/ReviewService";
import { IReview } from "../models/IReview";
import ReactMarkdown from "react-markdown";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Stack from "@mui/material/Stack";

const Review: React.FC = () => {
  const { store } = useContext(Context);
  const [data, setData] = useState<IReview>(Object);
  useEffect(() => {
    getReview();
  }, []);
  const getReview = async () => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const reviewsIndex = pathParts.indexOf("reviews");
    const id = +pathParts[reviewsIndex + 1];

    try {
      const response = await ReviewService.fetchReview(id);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={data.img}
            className="w-100 h-auto"
            style={{ minHeight: "240px" }}
            alt={data.title}
          />
        </div>
        <div className="col-md-8">
          <div className="row">
            <h1 className="col-md-8">{data.title}</h1>
            <div className="col-md-4 d-flex align-items-center justify-content-evenly">
              <span className="text-success fs-2 fw-bold">{data.rating}.0</span>
              <Rating
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#ff6d75",
                  },
                  "& .MuiRating-iconHover": {
                    color: "#ff3d47",
                  },
                }}
                defaultValue={0}
                precision={1}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                max={1}
                size="large"
              />
            </div>
          </div>
          <hr />
          <div className="tags">
            <span className="text-muted">{data.tags}</span>
          </div>
          <div className="lh-lg">
            <div className="d-flex">
              <div className="col-6">Name of Art:</div>
              <div className="col-6">{data.nameofart}</div>
            </div>
            <div className="d-flex">
              <div className="col-6">Category:</div>
              <div className="col-6">{data.category}</div>
            </div>
            <div className="d-flex">
              <div className="col-6">
                <Stack spacing={1}>
                  <Rating name="size-large" defaultValue={0} size="large" />
                </Stack>
              </div>
              <div className="col-6">4.7 - 6 votes</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content my-4">
        <ReactMarkdown>{data.text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default observer(Review);
