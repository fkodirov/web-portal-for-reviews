import "./App.css";
import { FC, useContext, useEffect } from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import UserReviews from "./components/UserReviews";
import { Route, Routes, Navigate } from "react-router-dom";
import NewReview from "./components/NewReview";
import EditReview from "./components/EditReview";
import Review from "./components/Review";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/404";

const App: FC = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    } else {
      store.setLoading(false);
    }
  }, [store]);
  useEffect(() => {
    store.getUserLikes();
    store.getUserRatings();
  }, [store.isAuth, store]);

  if (store.isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary w-10 h-10"
          role="status"
        ></div>
      </div>
    );
  }
  if (!store.isAuth) {
    return (
      <>
        <Header />
        <Routes>
          <Route path={`/`} element={<Main />} />
          <Route path={`/reviews/:id/`} element={<Review />} />
          <Route path={`/404`} element={<ErrorPage />} />
          <Route path={`*`} element={<Navigate to="/404" />} />
        </Routes>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path={`/`} element={<Main />} />
        <Route
          path={`/admin/${store.user.role === "admin" && store.user.id}/users`}
          element={<Dashboard />}
        />
        <Route path={`/user/:id/reviews`} element={<UserReviews />} />
        <Route path={`/user/:id/new-review`} element={<NewReview />} />
        <Route
          path={`/user/:id/reviews/:reviewId/edit`}
          element={<EditReview />}
        />
        <Route
          path={`/user/:id/reviews/:reviewId/preview`}
          element={<Review />}
        />
        <Route path={`/reviews/:id/`} element={<Review />} />
        <Route path={`/404`} element={<ErrorPage />} />
        <Route path={`*`} element={<Navigate to="/404" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default observer(App);
