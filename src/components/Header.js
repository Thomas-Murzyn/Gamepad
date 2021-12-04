import { useNavigate } from "react-router";
import logo from "../assets/logo.png";

const Header = ({ userToken }) => {
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
              userToken ? navigate("/mycollection") : navigate("/login");
            }}
          >
            My Collection
          </button>
          {!userToken ? (
            <button onClick={() => navigate("/login")} className="login-button">
              Login
            </button>
          ) : (
            <button
              onClick={() => navigate("/user_profil")}
              className="login-button"
            >
              My Profil
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
