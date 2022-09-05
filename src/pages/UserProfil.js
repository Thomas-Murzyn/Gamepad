import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Loading from "../components/Loading";
import userLogo from "../assets/user-logo.png";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../App";

const UserProfil = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-by-thomas.herokuapp.com/user_profil`,
          {
            headers: {
              Authorization: `Bearer ${userContext.user.userToken}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.picture) {
          const newUserPicture = {
            type: "UPDATE_USER_PICTURE",
            payload: response.data.picture.secure_url,
          };
          userContext.userDispatch(newUserPicture);
          // setUserPicture(response.data.picture.secure_url);
        }

        setData(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [userContext.user.userToken, refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        `https://gamepad-by-thomas.herokuapp.com/user_profil/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userContext.user.userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setPicture(null);
      setRefresh(refresh + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = () => {
    Cookies.remove("token");
    const newUserToken = { type: "UPDATE_USER_TOKEN", payload: null };
    userContext.userDispatch(newUserToken);
    // setUserToken(null);
    const newUserPicture = {
      type: "UPDATE_USER_PICTURE",
      payload: null,
    };
    userContext.userDispatch(newUserPicture);
    // setGlobalUserPicture(null);
    navigate("/");
  };

  return isLoading ? (
    <div className="user-profil-container">
      <h2>Your profil</h2>

      <div className="user-profil-wrapper">
        <h3>Welcome {data.username}</h3>
        <form onSubmit={handleSubmit} className="file-input">
          <Avatar
            className="avatar_profil"
            src={
              userContext.user.userPicture
                ? userContext.user.userPicture
                : userLogo
            }
            alt=""
          />
          <input
            onChange={(e) => setPicture(e.target.files[0])}
            type="file"
            id="file"
            className="file"
          />
          <label htmlFor="file">Change your picture</label>
          {picture && <p style={{ fontSize: "15px" }}>{picture.name}</p>}
          {picture && (
            <input className="input-sub" type="submit" value="Envoyer" />
          )}
        </form>

        <button onClick={() => navigate("/my_review")}>My reviews</button>
        <button onClick={() => navigate("/mycollection")}>My favorites</button>
        <button onClick={logOut}>Sign out</button>
      </div>
    </div>
  ) : (
    <div className="loading-wrapper">
      <Loading />
    </div>
  );
};

export default UserProfil;
