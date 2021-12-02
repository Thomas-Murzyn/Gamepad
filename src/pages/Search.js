import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Game from "../components/Game";

const Search = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { title } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/search?title=${title}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [title]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${search}`);
  };

  return isLoading ? (
    <div className="search-result-wrapper">
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
    </div>
  ) : (
    <p>Downloading</p>
  );
};

export default Search;
