import React from "react";
import { useTranslation } from "react-i18next";
const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <header className="container">
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
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link">{t("login")}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">{t("signin")}</a>
              </li>
            </ul>
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
