import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./main.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
