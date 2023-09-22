import { FC, useState, useContext, useEffect } from "react";

import { Context } from "../main";
import { observer } from "mobx-react-lite";
import SearchService from "../services/SearchService";
import { IReview } from "../models/IReview";
import Card from "./Card";

const SearchResult: FC = () => {
  const [ratings, setRatings] = useState<number[]>([]);
  const [foundReviews, setFoundReviews] = useState<IReview[]>([]);
  const { store } = useContext(Context);

  useEffect(() => {
    const ratings = store.reviewRating.map((e) => e.reviewId);
    setRatings(ratings);
    getReviews();
  }, [store.searchQuery]);

  const getReviews = async () => {
    try {
      if (store.searchQuery) {
        const response = await SearchService.fetchReviews(store.searchQuery);
        setFoundReviews(response.data);
      } else {
        setFoundReviews([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="row gap-3 pt-4 justify-content-center">
            <h2 className="text-center">Search Result</h2>
            {foundReviews.length != 0
              ? foundReviews.map((review) => (
                  <Card
                    key={review.id}
                    review={review}
                    like={store.reviewLike.includes(review.id) ? 1 : 0}
                    rating={ratings.includes(review.id) ? 1 : 0}
                  />
                ))
              : "Not Found"}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(SearchResult);
