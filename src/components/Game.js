const Game = ({ name, picture }) => {
  return (
    <div className="game">
      <div className="pictureContainer">
        <img src={picture} alt="" />
      </div>

      <div className="titleContainer">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Game;
