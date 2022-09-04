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
import React, { useState, useReducer, useEffect } from "react";
import Cookies from "js-cookie";
import MyReview from "./pages/MyReview";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
library.add(faThumbsUp, faThumbsDown);

export const UserContext = React.createContext();

const initialState = {
  userToken: Cookies.get("token") || null,
  userPicture: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER_TOKEN":
      return {
        ...state,
        userToken: action.payload,
      };
    case "UPDATE_USER_PICTURE":
      return {
        ...state,
        userPicture: action.payload,
      };
    default:
      return state;
  }
};

function App() {
  // eslint-disable-next-line
  const [userToken, setUserToken] = useState();

  const [user, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setUserToken(user.userToken);
  }, [user]);

  return (
    <Router>
      <UserContext.Provider value={{ user, userDispatch: dispatch }}>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/detail/:id"} element={<Detail />} />
          <Route path={"/search/:title"} element={<Search />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/user_profil"} element={<UserProfil />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/mycollection"} element={<MyCollection />} />
          <Route path={"/review/:id"} element={<Review />} />
          <Route path={"/my_review"} element={<MyReview />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
