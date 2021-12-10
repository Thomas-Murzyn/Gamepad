import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Game from "../components/Game";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/pagination/${currentPage}`
        );

        setData(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${search}`);
  };

  return isLoading ? (
    <main>
      <h1>Gamepad</h1>

      <form onSubmit={handleSubmit} className="searching-input">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for a game."
        />
      </form>

      <div className="allGames">
        {data.results.map((game, index) => {
          return <Game key={index} game={game} />;
        })}
      </div>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  ) : (
    <div className="loading-wrapper">
      <Loading />
    </div>
  );
};

export default Home;
