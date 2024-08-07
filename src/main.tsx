import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleMapProvider from "./components/GoogleMapProvider.tsx";
import App from "./App.tsx";
import store from "./store.ts";

import "antd/dist/reset.css";
import "./assets/scss/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAuth_API}>
      <GoogleMapProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleMapProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
