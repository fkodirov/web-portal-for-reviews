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

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language") || "en");
  }, []);

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
    localStorage.setItem("language", lng);
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

  const handleLogout = () => {
    if (store.user.googleId) window.open(`${URL}/auth/google/logout`, "_self");
    else if (store.user.facebookId)
      window.open(`${URL}/auth/facebook/logout`, "_self");
    else store.logout();
    navigate(`/`);
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
                        handleLogout();
                      }}
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="col-md-4 text-end me-2">
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
                defaultValue={localStorage.getItem("language") || "en"}
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
