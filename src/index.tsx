import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./main.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./Contexts/UserContext";
// React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnonymousUserContextProvider } from "./Contexts/AnonymousUserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserContextProvider>
    <AnonymousUserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AnonymousUserContextProvider>
  </UserContextProvider>
);
