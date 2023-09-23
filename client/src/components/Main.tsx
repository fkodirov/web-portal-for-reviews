import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import Card from "./Card";
import ReviewService from "../services/ReviewService";
import { IReview } from "../models/IReview";
import { Context } from "../main";
import TagCloudComponent from "./TagCloud";

const Main: React.FC = () => {
  const { store } = useContext(Context);
  const [topReviews, setTopReviews] = useState<IReview[]>([]);
  const [lastReviews, setLastReviews] = useState<IReview[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);

  useEffect(() => {
    getTopReviews();
    getLastReviews();
    const ratings = store.reviewRating.map((e) => e.reviewId);
    setRatings(ratings);
  }, [store.reviewRating]);

  const getTopReviews = async () => {
    try {
      const response = await ReviewService.fetchReviews("rating", "DESC");
      setTopReviews(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getLastReviews = async () => {
    try {
      const response = await ReviewService.fetchReviews("id", "DESC");
      setLastReviews(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <main className="col-md-9">
          <div className="row gap-3 pt-4 justify-content-center">
            <h2 className="text-center">Top Reviews</h2>
            {topReviews.map((review) => (
              <Card
                key={review.id}
                review={review}
                like={store.reviewLike.includes(review.id) ? 1 : 0}
                rating={ratings.includes(review.id) ? 1 : 0}
              />
            ))}
            <h2 className="text-center">Last Reviews</h2>
            {lastReviews.map((review) => (
              <Card
                key={review.id}
                review={review}
                like={store.reviewLike.includes(review.id) ? 1 : 0}
                rating={ratings.includes(review.id) ? 1 : 0}
              />
            ))}
          </div>
        </main>
        <aside className="col-md-3 text-center">
          <TagCloudComponent />
        </aside>
      </div>
    </div>
  );
};

export default observer(Main);
