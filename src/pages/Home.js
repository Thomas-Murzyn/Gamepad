import axios from "axios";
import { useState, useEffect } from "react";
import Game from "../components/Game";
import Pagination from "../components/Pagination";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/");

        setData(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <main>
      <h1>Gamepad</h1>

      <div className="allGames">
        {data.results.map((game, index) => {
          return <Game key={index} game={game} />;
        })}
      </div>

      <Pagination data={data} />
    </main>
  ) : (
    <div>Downloading</div>
  );
};

export default Home;
