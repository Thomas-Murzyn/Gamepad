import { useNavigate } from "react-router";

const FavoriteGame = ({ game }) => {
  const navigate = useNavigate();
  return (
    <div
      className="game"
      onClick={() => {
        navigate(`/detail/${game.favoriteId}`);
      }}
    >
      <img src={game.picture} alt={game.title} />

      <div className="titleContainer">
        <h3>{game.title}</h3>
      </div>
    </div>
  );
};

export default FavoriteGame;
