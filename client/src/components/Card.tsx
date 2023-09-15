import { IReview } from "../models/IReview";
import defaultImg from "../assets/default-image.jpg";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { observer } from "mobx-react-lite";

interface CardProps {
  review: IReview;
  like: number;
  rating: number;
}

const Card: React.FC<CardProps> = ({ review, like, rating }) => {
  return (
    <>
      <div className="col-lg-4 col-md-5 card card-default shadow p-3 mb-5 rounded">
        <div className="">
          <img
            className="card-img-top"
            src={review.img ? review.img : defaultImg}
            alt={review.title}
          />
        </div>
        <div className="card-body">
          <div className="card-top">
            <h5 className="card-title">
              <Link to={`/reviews/${review.id}`}>{review.title} </Link>
            </h5>
            <div className="author-rate">
              <span className="badge bg-success">{review.authorRating}</span>
            </div>
          </div>
          <h6>
            {review.nameofart}{" "}
            <span className="badge badge-games">{review.category}</span>
          </h6>
        </div>
        <div className="card-footer d-flex justify-content-evenly">
          <div className="card-rating d-flex gap-3">
            <div className="rate">{review.rating}</div>
            {rating ? <StarIcon htmlColor="#faaf00" /> : <StarBorderIcon />}
          </div>
          <div className="card-favorite">
            {like ? (
              <FavoriteIcon htmlColor="#ff6d75" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Card);
