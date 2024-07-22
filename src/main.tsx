import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import store from "./store.ts";

import "antd/dist/reset.css";
import "./assets/scss/index.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId='65418245861-2e1ofmjjaqe4glkc3q8k8ijducq8qg23.apps.googleusercontent.com'>
    <Provider store={store}>
      <App />
    </Provider>
    </ GoogleOAuthProvider>
  </BrowserRouter>
);
