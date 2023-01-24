import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import FavoriteGame from "../components/FavoriteGame";
import { UserContext } from "../App";

const MyCollection = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gamepad-by-thomas.onrender.com/favorite/get",
          {
            headers: {
              Authorization: `Bearer ${userContext.user.userToken}`,
            },
          }
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userContext.user.userToken]);

  return isLoading ? (
    <div className="my-collection">
      <h2>My Collection</h2>
      <div className="my-collection-wrapper">
        {data.map((item, index) => {
          return <FavoriteGame key={index} game={item} />;
        })}
      </div>
    </div>
  ) : (
    <div className="loading-wrapper">
      <Loading />
    </div>
  );
};

export default MyCollection;
