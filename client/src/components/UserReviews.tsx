import React, { useContext } from "react";

import { observer } from "mobx-react-lite";
import ReviewList from "./ReviewList";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const UserReviews: React.FC = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);

  return (
    <div className="container">
      <h2>Reviews</h2>
      <button
        type="button"
        className="btn btn-primary my-3"
        onClick={() => navigate(`/user/${store.user.id}/new-review`)}
      >
        Add Review
      </button>
      <ReviewList />
    </div>
  );
};

export default observer(UserReviews);
