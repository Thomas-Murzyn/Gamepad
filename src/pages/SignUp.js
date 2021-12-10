import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import Cookies from "js-cookie";

const SignUp = ({ setUserToken }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUserName] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === password2) {
      try {
        const response = await axios.post(
          `https://gamepad-by-thomas.herokuapp.com/signup`,
          {
            mail,
            password,
            username,
            age,
          }
        );

        const token = response.data.token;
        Cookies.set("token", token, { expires: 7 });
        setUserToken(token);
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Les 2 mots de passe ne sont pas identiques.");
    }
  };

  return (
    <div className="login-wrapper">
      <h2>S'inscrire</h2>
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
          <label htmlFor="username">Nom</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            name="username"
            type="text"
          />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            onChange={(e) => setAge(e.target.value)}
            id="age"
            name="age"
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

        <div>
          <label htmlFor="password2">Confirmez le mot de passe</label>
          <input
            onChange={(e) => setPassword2(e.target.value)}
            id="password2"
            name="password2"
            type="password"
          />
        </div>

        <input className="login-button-form" type="submit" value="Valider" />
        <p onClick={() => navigate("/login")}>
          Vous avez déjà un compte ? Se connecter.
        </p>
      </form>
    </div>
  );
};

export default SignUp;
