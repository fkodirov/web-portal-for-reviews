import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import ReviewList from "./ReviewList";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";

const UserReviews: React.FC = () => {
  const [user, setUser] = useState<IUser>(Object);
  const navigate = useNavigate();
  const { store } = useContext(Context);
  let id = 0;
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/");
  const reviewsIndex = pathParts.indexOf("user");
  id = +pathParts[reviewsIndex + 1];

  useEffect(() => {
    getUser(id);
  }, []);

  const getUser = async (id: number) => {
    try {
      const response = await UserService.fetchUser(
        store.user.role !== "admin" ? store.user.id : id
      );
      if (
        response.data === null ||
        (store.user.role !== "admin" && store.user.id != id)
      )
        navigate("/404");
      else setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <h2>Reviews</h2>
      <button
        type="button"
        className="btn btn-primary my-3"
        onClick={() => navigate(`/user/${id}/new-review`)}
      >
        Add Review
      </button>
      <ReviewList user={user} />
    </div>
  );
};

export default observer(UserReviews);
