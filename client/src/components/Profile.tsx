import { FC, useState, useContext, useEffect } from "react";
// import { useTranslation } from "react-i18next";

import { Context } from "../main";
import { stringAvatar } from "../utils/helper";
import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LikeService from "../services/LikeService";
import ReviewService from "../services/ReviewService";

const Profile: FC = () => {
  const { store } = useContext(Context);
  const [likes, setLikes] = useState<null | number>(0);

  useEffect(() => {
    getUserReviews();
  }, []);

  const getLikeCount = async (ids: number[]) => {
    try {
      const response = await LikeService.reviewLikes(ids);
      setLikes(response.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserReviews = async () => {
    try {
      const response = await ReviewService.fetchUserReviews(store.user.id);
      const ids = response.data.map((e) => e.id);
      getLikeCount(ids);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container">
        <h2>User Info</h2>
        <div className="row">
          <div className="card mb-4 col-lg-6 mw-100">
            <div className="card-body text-center">
              <div className="d-flex justify-content-center mb-3">
                <Avatar
                  {...stringAvatar(
                    store.user?.name?.toUpperCase().toString() || ""
                  )}
                />
              </div>
              <h5>{store.user.name}</h5>
              <div className="d-flex justify-content-center align-items-center mb-3">
                {likes && <b className="me-2">{likes}</b>}
                <Rating
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#ff6d75",
                    },
                    "& .MuiRating-iconHover": {
                      color: "#ff3d47",
                    },
                  }}
                  value={1}
                  precision={1}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  max={1}
                  size="large"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="card mb-4 col-lg-6 mw-100">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">User ID</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{store.user.id}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">User Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{store.user.name}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{store.user.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Role</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{store.user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Profile);
