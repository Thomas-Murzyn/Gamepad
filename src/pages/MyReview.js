import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReviewDetail from "../components/ReviewDetail";
import Loading from "../components/Loading";
import { UserContext } from "../App";

const MyReview = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const response = await axios.get(
          `https://gamepad-by-thomas.herokuapp.com/my_review`,
          {
            headers: {
              Authorization: `Bearer ${userContext.user.userToken}`,
            },
          }
        );
        console.log(response.data);
        setReviews(response.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userContext.user.userToken]);

  return isLoading ? (
    <div className="reviews-container">
      <h2 style={{ fontSize: "30px", fontWeight: "600" }}>Reviews</h2>

      {reviews.length > 0 ? (
        <div className="review-wrapper">
          {reviews.map((review, index) => {
            return (
              <ReviewDetail
                key={index}
                title={review.title}
                description={review.description}
                score={review.score}
                user={review.user}
              />
            );
          })}
        </div>
      ) : (
        <h3 className="no-review">No reviews</h3>
      )}
    </div>
  ) : (
    <div className="loading-wrapper">
      <Loading />
    </div>
  );
};

export default MyReview;
