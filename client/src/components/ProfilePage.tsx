import React from "react";

import { observer } from "mobx-react-lite";
// import UploadImage from "./UploadImage";
// import ReviewList from "./ReviewList";
import NewReview from "./NewReview";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <h2>User Profile</h2>
      {/* <ReviewList /> */}
      <NewReview />
    </div>
  );
};

export default observer(ProfilePage);
