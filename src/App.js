import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Login from "./pages/Login";
import UserProfil from "./pages/UserProfil";
import SignUp from "./pages/SignUp";
import MyCollection from "./pages/MyCollection";
import Review from "./pages/Review";
import { useState } from "react";
import Cookies from "js-cookie";
import MyReview from "./pages/MyReview";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
library.add(faThumbsUp, faThumbsDown);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [refreshApp, setRefreshApp] = useState(1);

  return (
    <Router>
      <Header refreshApp={refreshApp} token={userToken} />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/detail/:id"} element={<Detail token={userToken} />} />
        <Route path={"/search/:title"} element={<Search />} />
        <Route
          path={"/login"}
          element={<Login setUserToken={setUserToken} />}
        />
        <Route
          path={"/user_profil"}
          element={
            <UserProfil
              token={userToken}
              refreshApp={refreshApp}
              setRefreshApp={setRefreshApp}
            />
          }
        />
        <Route
          path={"/signup"}
          element={<SignUp setUserToken={setUserToken} />}
        />
        <Route
          path={"/mycollection"}
          element={<MyCollection token={userToken} />}
        />
        <Route path={"/review/:id"} element={<Review token={userToken} />} />
        <Route path={"/my_review"} element={<MyReview token={userToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
