import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Game from "../components/Game";
import Loading from "../components/Loading";

const Search = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("");
  const [type, setType] = useState("");
  const [ordering, setOrdering] = useState("");

  const { title } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/search?title=${title}&platforms=${platform}&genres=${type}&ordering=${ordering}`
        );

        setData(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [title, platform, type, ordering]);

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

      <div className="search-result">
        <h2>{`Search result for ${title}`}</h2>
        <p>{`${data.count} games`}</p>
      </div>

      <div className="select-wrapper">
        <div className="select-container-1">
          <select
            onChange={(e) => setPlatform(e.target.value)}
            name="platform"
            id="platform-selected"
          >
            <option value="">Platform : </option>
            <option value="187">PS5</option>
            <option value="18">PS4</option>
            <option value="16">PS3</option>
            <option value="15">PS2</option>
            <option value="27">PS1</option>
            <option value="19">PS Vita</option>
            <option value="17">PSP</option>
            <option value="186">Xbox series S-X</option>
            <option value="1">Xbox One</option>
            <option value="14">Xbox 360</option>
            <option value="3">Xbox</option>
            <option value="4">PC</option>
            <option value="5">Mac Os</option>
            <option value="7">Nintendo switch</option>
            <option value="83">Nintendo 64</option>
            <option value="10">Wii U</option>
            <option value="105">GameCube</option>
            <option value="24">Game Boy Advance</option>
            <option value="8">Nintendo 3DS</option>
            <option value="9">Nintendo DS</option>
            <option value="13">Nintendo DSI</option>
            <option value="3">IOS</option>
            <option value="21">Android</option>
            <option value="8">Nintendo 3DS</option>
            <option value="107">Sega Saturn</option>
            <option value="112">Jaguar</option>
          </select>

          <select
            onChange={(e) => setType(e.target.value)}
            name="type"
            id="type"
          >
            <option value="">Type :</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="indie">Indie</option>
            <option value="shooter">Shooter</option>
            <option value="sports">Sport</option>
            <option value="racing">racing</option>
            <option value="role-playing-games-rpg">RPG</option>
            <option value="puzzle">Puzzle</option>
          </select>
        </div>

        <div
          onChange={(e) => setOrdering(e.target.value)}
          className="select-container-2"
        >
          <select name="sort" id="sort">
            <option value="">Sort by : </option>
            <option value="name">Name</option>
            <option value="released">Released</option>
            <option value="added">Added</option>
            <option value="created">Created</option>
            <option value="rating">Rating</option>
            <option value="metacritic">Metacritic</option>
          </select>
        </div>
      </div>

      <div className="allGames">
        {data.results.length > 0 ? (
          data.results.map((game, index) => {
            return <Game key={index} game={game} />;
          })
        ) : (
          <h2>No results found for this game.</h2>
        )}
      </div>
    </div>
  ) : (
    <div className="loading-wrapper">
      <Loading />
    </div>
  );
};

export default Search;
