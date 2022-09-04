import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../App";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://gamepad-by-thomas.herokuapp.com/signin`,
        {
          mail,
          password,
        }
      );

      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      const newUserToken = { type: "UPDATE_USER_TOKEN", payload: token };
      userContext.userDispatch(newUserToken);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mail">Email</label>
          <input
            onChange={(e) => setMail(e.target.value)}
            id="mail"
            name="mail"
            type="text"
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
          />
        </div>

        <input className="login-button-form" type="submit" value="Valider" />
        <p onClick={() => navigate("/signup")}>Se créer un compte</p>
      </form>
    </div>
  );
};

export default Login;
