import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const ReviewDetail = ({
  title,
  description,
  score,
  user,
  id,
  refresh,
  setRefresh,
}) => {
  const plusScore = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/add_score_review/${id}`,
        {
          user,
          score: 1,
        }
      );

      console.log(response.data);
      setRefresh(refresh + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const moinsScore = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/less_score_review/${id}`,
        {
          user,
          score: 1,
        }
      );

      console.log(response.data);
      setRefresh(refresh + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="review-detail-wrapper">
      <h4>{title}</h4>
      <p>{description}</p>
      <div>
        <span>{user.username}</span>
        <span>
          <FontAwesomeIcon
            onClick={plusScore}
            className="plus"
            icon="thumbs-up"
          />
          <span> &nbsp;{score}&nbsp; </span>
          <FontAwesomeIcon
            onClick={moinsScore}
            className="moins"
            icon="thumbs-down"
          />
        </span>
      </div>
    </div>
  );
};

export default ReviewDetail;
