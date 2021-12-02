import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-wrapper">
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <h2>Gamepad</h2>
        </div>

        <nav>
          <button>My Collection</button>
          <button className="login-button">Login</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
