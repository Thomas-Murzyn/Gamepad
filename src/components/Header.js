import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useEffect, useContext } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../App";

const Header = () => {
  const userContext = useContext(UserContext);
  console.log(
    "🚀 ~ file: Header.js ~ line 10 ~ Header ~ userContext",
    userContext.user
  );

  useEffect(() => {
    const fetchData = async () => {
      if (userContext.user.userToken) {
        try {
          const response = await axios.get(
            `https://gamepad-by-thomas.herokuapp.com/user_profil`,
            {
              headers: {
                Authorization: `Bearer ${userContext.user.userToken}`,
              },
            }
          );

          if (response.data.picture) {
            const newUserPicture = {
              type: "UPDATE_USER_PICTURE",
              payload: response.data.picture.secure_url,
            };
            userContext.userDispatch(newUserPicture);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [userContext.user.userToken]);

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
              userContext.user.userToken
                ? navigate("/mycollection")
                : navigate("/login");
            }}
          >
            Collection
          </button>
          {userContext.user.userToken && userContext.user.userPicture ? (
            <Avatar
              className="avatar"
              onClick={() => navigate("/user_profil")}
              src={userContext.user.userPicture}
              alt="user"
            />
          ) : userContext.user.userToken && !userContext.user.userPicture ? (
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
