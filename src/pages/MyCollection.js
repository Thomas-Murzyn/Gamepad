import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import FavoriteGame from "../components/FavoriteGame";

const MyCollection = ({ token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/favorite/get", {
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
    <div className="my-collection">
      <h2>My Collection</h2>
      <div className="my-collection-wrapper">
        {data.map((item, index) => {
          return <FavoriteGame game={item} />;
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
