import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "./lang/i18n.ts";
import { createContext } from "react";
import { BrowserRouter } from "react-router-dom";

import Store from "./store/store.ts";
interface IStore {
  store: Store;
}
const store = new Store();
export const Context = createContext<IStore>({ store });

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </BrowserRouter>
);
