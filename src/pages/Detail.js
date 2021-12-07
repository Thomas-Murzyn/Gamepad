import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Game from "../components/Game";
import Loading from "../components/Loading";

const Detail = ({ token }) => {
  const [data, setData] = useState(null);
  const [gamesData, setGamesData] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/game/${id}`);

        const secondResponse = await axios.get(
          `http://localhost:4000/similar_game/${response.data.slug}`
        );

        const thirdResponse = await axios.get(
          `http://localhost:4000/favorite/getOne/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsFavorite(thirdResponse.data.value);
        setData(response.data);
        setGamesData(secondResponse.data);
        setIsloading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id, token, isFavorite]);

  const addToFavorite = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/favorite/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsFavorite(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeToFavorite = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/favorite/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setIsFavorite(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <div className="detail-wrapper">
      <div className="detail-container">
        <h2>{data.name}</h2>
        <div className="game-detail-container">
          <img src={data.background_image} alt={`${data.name}`} />
          <div className="detail-game">
            <div className="detail-button-container">
              {isFavorite ? (
                <button onClick={removeToFavorite}>Remove to collection</button>
              ) : (
                <button onClick={addToFavorite}>Save to Collection</button>
              )}
              <button>add a Review</button>
            </div>

            <div className="detail-info-container">
              <div className="col-1">
                <p>Plateforms</p>
                <p>
                  {data.platforms.map((item, index) => {
                    return <span key={index}>{`${item.platform.name}, `}</span>;
                  })}
                </p>

                <div className="detail-p">
                  <p>Released date</p>
                  <p>{data.released}</p>
                </div>

                <div className="detail-p">
                  <p>Publisher</p>
                  <p>
                    {data.publishers.map((item, index) => {
                      return <span key={index}>{`${item.name} `}</span>;
                    })}
                  </p>
                </div>

                <div className="detail-p">
                  <p>About</p>
                  <p className="text">{data.description_raw}</p>
                </div>
              </div>

              <div className="col-2">
                <p>Genre</p>
                <p>
                  {data.genres.map((item, index) => {
                    return <span key={index}>{`${item.name}, `}</span>;
                  })}
                </p>

                <div className="detail-p">
                  <p>Developer</p>
                  <p>
                    {data.developers.map((item, index) => {
                      return <span key={index}>{`${item.name} `}</span>;
                    })}
                  </p>
                </div>

                <div className="detail-p">
                  <p>Age rating</p>
                  <p>{data.esrb_rating?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="similar-games">
        <h2>{`Games like ${data.name}`}</h2>

        <div className="similar-games-list">
          {gamesData.results.length > 0 ? (
            gamesData.results.map((game, index) => {
              if (index < 5) {
                return <Game key={index} game={game} />;
              } else {
                return null;
              }
            })
          ) : (
            <h2>No similar games found for this game.</h2>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="loading-wrapper">
      <Loading />
    </div>
  );
};

export default Detail;
