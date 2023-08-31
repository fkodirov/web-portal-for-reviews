import React, { useContext } from "react";

import { observer } from "mobx-react-lite";
import ReviewList from "./ReviewList";
import { Context } from "../main";
// import NewReview from "./NewReview";

const ProfilePage: React.FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="container">
      <h2>Reviews</h2>
      <button type="button" className="btn btn-primary my-3">
        Add Review
      </button>
      <ReviewList />
      {/* <NewReview /> */}
    </div>
  );
};

export default observer(ProfilePage);
