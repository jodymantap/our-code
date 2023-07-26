import ReactDOM from "react-dom/client";
import RouterPage from "./router";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { Provider } from "react-redux";
import { store } from "./state/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppLayout>
        <RouterPage />
      </AppLayout>
    </BrowserRouter>
  </Provider>
);
