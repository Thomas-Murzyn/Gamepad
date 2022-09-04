import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useEffect, useContext } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../App";

const Header = ({ token, refreshApp, picture, setUserPicture }) => {
  const userContext = useContext(UserContext);
  console.log(
    "🚀 ~ file: Header.js ~ line 10 ~ Header ~ userContext",
    userContext
  );

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `https://gamepad-by-thomas.herokuapp.com/user_profil`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.picture) {
            setUserPicture(response.data.picture.secure_url);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [token, refreshApp]);

  const navigate = useNavigate();

  return (
    <header>
      <div className="header-wrapper">
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <img src={logo} alt="" />
          <h2>Gamepad</h2>
        </div>

        <nav>
          <button
            onClick={() => {
              token ? navigate("/mycollection") : navigate("/login");
            }}
          >
            Collection
          </button>
          {token && picture ? (
            <Avatar
              className="avatar"
              onClick={() => navigate("/user_profil")}
              src={picture}
              alt="user"
            />
          ) : token && !picture ? (
            <button
              onClick={() => navigate("/user_profil")}
              className="login-button"
            >
              Profil
            </button>
          ) : (
            <button onClick={() => navigate("/login")} className="login-button">
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
