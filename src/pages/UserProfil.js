import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import userLogo from "../assets/user-logo.png";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";

const UserProfil = ({
  token,
  refreshApp,
  setRefreshApp,
  setUserToken,
  setGlobalUserPicture,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [userPicture, setUserPicture] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-by-thomas.herokuapp.com/user_profil`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.picture) {
          setUserPicture(response.data.picture.secure_url);
        }

        setData(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [token, refresh]);

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
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setPicture(null);
      setRefresh(refresh + 1);
      setRefreshApp(refreshApp + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = () => {
    Cookies.remove("token");
    setUserToken(null);
    setGlobalUserPicture(null);
    navigate("/");
  };

  return isLoading ? (
    <div className="user-profil-container">
      <h2>Your profil</h2>

      <div className="user-profil-wrapper">
        <form onSubmit={handleSubmit} className="file-input">
          <Avatar
            className="avatar_profil"
            src={userPicture ? userPicture : userLogo}
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

        <p>{data.username}</p>

        <p>{data.description}</p>

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
