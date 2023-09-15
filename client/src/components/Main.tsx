import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import Card from "./Card";
import ReviewService from "../services/ReviewService";
import { IReview } from "../models/IReview";
import { Context } from "../main";
const Main: React.FC = () => {
  const { store } = useContext(Context);
  const [topReviews, setTopReviews] = useState<IReview[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);

  useEffect(() => {
    getTopReviews();
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

  return (
    <main className="container">
      <div className="row gap-3 p-4 justify-content-center">
        {topReviews.map((review) => (
          <Card
            key={review.id}
            review={review}
            like={store.reviewLike.includes(review.id) ? 1 : 0}
            rating={ratings.includes(review.id) ? 1 : 0}
          />
        ))}
      </div>
    </main>
  );
};

export default observer(Main);
