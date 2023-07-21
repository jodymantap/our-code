import ReactDOM from "react-dom/client";
import RouterPage from "./router";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RouterPage />
  </BrowserRouter>
);
