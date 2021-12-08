import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import userLogo from "../assets/user-logo.png";

const UserProfil = ({ token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useState(() => {
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
  }, []);

  return isLoading ? (
    <div className="user-profil-container">
      <h2>Your profil</h2>

      <div className="user-profil-wrapper">
        <div className="user-profil-header">
          <img src={userLogo} alt="" />
          <p>{data.username}</p>
        </div>

        <p>{data.description}</p>

        <button>My reviews</button>
        <button>My favorite games</button>
      </div>
    </div>
  ) : (
    <div className="loading-wrapper">
      <Loading />
    </div>
  );
};

export default UserProfil;
