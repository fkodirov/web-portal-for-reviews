import { useState, useContext, useRef, useEffect, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import Registration from "./Registration";
import Login from "./Login";
import { Context } from "../main";
import { Link } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { stringAvatar } from "../utils/helper";
import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { URL } from "../http";

const Header: React.FC = () => {
  const { store } = useContext(Context);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowLogin(false);
    setShowSignUp(false);
  }, [store.isAuth]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showToggle]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      showToggle
    ) {
      setShowToggle(!showToggle);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const handleToggleClick = () => {
    setShowToggle(!showToggle);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      store.setSearchQuery(event.target.value);
      const currentPath = window.location.pathname;
      !currentPath.includes("search") && navigate("/search");
    }, 1500);
  };
  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <RateReviewIcon className="bi me-2" fontSize="large" />
            </Link>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 link-secondary">
                  {t("home")}
                </Link>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-body-emphasis">
                  {t("movies")}
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-body-emphasis">
                  {t("games")}
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-body-emphasis">
                  {t("books")}
                </a>
              </li>
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control"
                placeholder={t("search")}
                aria-label="Search"
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
            </form>
            {store.user.id ? (
              <div className="dropdown text-end me-2" ref={dropdownRef}>
                <a
                  href="#"
                  className={`d-block link-body-emphasis text-decoration-none dropdown-toggle ${
                    showToggle ? "show" : ""
                  }`}
                  data-bs-toggle="dropdown"
                  aria-expanded={showToggle ? true : false}
                  onClick={handleToggleClick}
                >
                  <Avatar
                    {...stringAvatar(
                      store.user?.name?.toUpperCase().toString() || ""
                    )}
                  />
                </a>
                <ul
                  className={`dropdown-menu text-small ${
                    showToggle ? "show" : ""
                  }`}
                  onClick={() => setShowToggle(false)}
                >
                  <li>
                    <Link
                      to={`/user/${store.user.id}/reviews`}
                      className="dropdown-item"
                    >
                      My Review
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/user/${store.user.id}/profile`}
                      className="dropdown-item"
                    >
                      Profile
                    </Link>
                  </li>
                  {store.user.role === "admin" && (
                    <li>
                      <Link
                        to={`admin/${store.user.id}/users`}
                        className="dropdown-item"
                      >
                        Users
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={() => {
                        store.user.googleId
                          ? window.open(`${URL}/auth/google/logout`, "_self")
                          : store.logout();
                        navigate(`/`);
                      }}
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="col-md-3 text-end me-2">
                <button
                  type="button"
                  className="btn btn-outline-primary me-2"
                  onClick={() => setShowLogin(true)}
                >
                  {t("login")}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowSignUp(true)}
                >
                  {t("signup")}
                </button>
              </div>
            )}
            <div className="lang mx-3">
              <select
                onChange={(e) => {
                  changeLanguage(e.target.value);
                }}
                className="form-select"
                defaultValue="en"
              >
                <option value="en">En</option>
                <option value="ru">Ru</option>
              </select>
            </div>
          </div>
        </div>
      </header>
      <Registration show={showSignUp} onClose={() => setShowSignUp(false)} />
      <Login show={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default observer(Header);
{
  /* <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={handleToggleClick}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse ${showMenu && `show`} navbar-collapse`}
              id="navbarTogglerDemo02"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    {t("home")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    {t("movies")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" aria-disabled="true">
                    {t("games")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" aria-disabled="true">
                    {t("books")}
                  </a>
                </li>
              </ul>
              {store.user.id ? (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={() => navigate(`/user/${store.user.id}/reviews`)}
                    >
                      My Reviews
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => setShowLogin(true)}>
                      {t("login")}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => setShowSignUp(true)}>
                      {t("signup")}
                    </a>
                  </li>
                </ul>
              )}
              <form className="d-flex me-2">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  aria-label="Search"
                />
                <button className="btn btn-danger" type="submit">
                  {t("search")}
                </button>
              </form>
              <div className="lang me-2">
                <select
                  onChange={(e) => {
                    changeLanguage(e.target.value);
                  }}
                  className="form-select"
                  defaultValue="en"
                >
                  <option value="en">En</option>
                  <option value="ru">Ru</option>
                </select>
              </div>
              <div className="mode">
                <select className="form-select me-2" defaultValue="light">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu text-small">
                  <li>
                    <a className="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header> */
}
