import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/Store";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/context/auth";
import HeadLinks from "./HeadLinks";
import '@fortawesome/fontawesome-free/css/all.min.css';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //By browser router we can create routes
  //Provider is used to link react and redux
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <React.Fragment>
          <HeadLinks/>
          <App />
          <Toaster/>
        </React.Fragment>
      </Provider>
    </BrowserRouter>
  </AuthProvider>

);
