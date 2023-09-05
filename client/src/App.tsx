import "./App.css";
import { FC, useContext, useEffect } from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import UserReviews from "./components/UserReviews";
import { Route, Routes } from "react-router-dom";
import NewReview from "./components/NewReview";
import EditReview from "./components/EditReview";
import Review from "./components/Review";

const App: FC = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    } else {
      store.setLoading(false);
    }
  }, [store]);

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
        <Main />
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
          path={`/user/${store.user.id}/reviews`}
          element={<UserReviews />}
        />
        <Route
          path={`/user/${store.user.id}/new-review`}
          element={<NewReview />}
        />
        <Route
          path={`/user/${store.user.id}/reviews/:id/edit`}
          element={<EditReview />}
        />
        <Route path={`/reviews/:id/`} element={<Review />} />
      </Routes>
      <Footer />
    </>
  );
};

export default observer(App);
