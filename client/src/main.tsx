// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "./lang/i18n.ts";
import { createContext } from "react";

import Store from "./store/store.ts";
interface IStore {
  store: Store;
}
const store = new Store();
export const Context = createContext<IStore>({ store });


const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);