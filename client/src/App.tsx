import "./App.css";
import { FC, useContext, useEffect } from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import ProfilePage from "./components/ProfilePage";

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
      <ProfilePage />
      <Footer />
    </>
  );
};

export default observer(App);
