import { useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = ({ token }) => {
  const [picture, setUserPicture] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user_profil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.picture) {
          setUserPicture(response.data.picture.secure_url);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [token]);

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
            My Collection
          </button>
          {token && picture ? (
            <img
              onClick={() => navigate("/user_profil")}
              src={picture}
              alt="user"
            />
          ) : token && !picture ? (
            <button
              onClick={() => navigate("/user_profil")}
              className="login-button"
            >
              My Profil
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
