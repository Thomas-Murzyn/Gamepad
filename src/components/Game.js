import { useNavigate } from "react-router";

const Game = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div
      className="game"
      onClick={() => {
        navigate(`/detail/${game.id}`);
      }}
    >
      <img src={game.background_image} alt={game.name} />

      <div className="titleContainer">
        <h3>{game.name}</h3>
      </div>
    </div>
  );
};

export default Game;
