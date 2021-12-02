import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const Detail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/game/${id}`);
        console.log(response.data);
        setData(response.data);
        setIsloading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const { id } = useParams();

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
                  <p>{data.esrb_rating.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="similar-games">
        <h2>{`Games like ${data.name}`}</h2>
      </div>
    </div>
  ) : (
    <div>DownLoading</div>
  );
};

export default Detail;
