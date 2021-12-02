import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Game from "../components/Game";

const Detail = () => {
  const [data, setData] = useState(null);
  const [gamesData, setGamesData] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/game/${id}`);

        const secondResponse = await axios.get(
          `http://localhost:4000/similar_game/${response.data.slug}`
        );

        setData(response.data);
        setGamesData(secondResponse.data);
        setIsloading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();

    return () => {
      console.log("Counter Destroyed");
    };
  }, [id]);

  return isLoading ? (
    <div className="detail-wrapper">
      <div className="detail-container">
        <h2>{data.name}</h2>
        <div className="game-detail-container">
          <img src={data.background_image} alt={`${data.name}`} />
          <div className="detail-game">
            <div className="detail-button-container">
              <button>Saved to Collection</button>
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
          {gamesData.results.map((game, index) => {
            if (index < 5) {
              return <Game key={index} game={game} />;
            }
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>DownLoading</div>
  );
};

export default Detail;
