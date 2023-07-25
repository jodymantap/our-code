import ReactDOM from "react-dom/client";
import RouterPage from "./router";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppLayout>
      <RouterPage />
    </AppLayout>
  </BrowserRouter>
);
