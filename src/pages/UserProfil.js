import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import userLogo from "../assets/user-logo.png";
import { useNavigate } from "react-router";

const UserProfil = ({ token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user_profil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setData(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [token]);

  return isLoading ? (
    <div className="user-profil-container">
      <h2>Your profil</h2>

      <div className="user-profil-wrapper">
        <div className="file-input">
          <img src={userLogo} alt="" />
          <input type="file" id="file" class="file" />
          <label for="file">Change your picture</label>
        </div>

        <p>{data.username}</p>

        <p>{data.description}</p>

        <button onClick={() => navigate("/my_review")}>My reviews</button>
        <button onClick={() => navigate("/mycollection")}>My favorites</button>
      </div>
    </div>
  ) : (
    <div className="loading-wrapper">
      <Loading />
    </div>
  );
};

export default UserProfil;
