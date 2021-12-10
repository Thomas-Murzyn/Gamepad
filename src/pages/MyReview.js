import { useState, useEffect } from "react";
import axios from "axios";
import ReviewDetail from "../components/ReviewDetail";
import Loading from "../components/Loading";

const MyReview = ({ token }) => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const response = await axios.get(
          `https://gamepad-by-thomas.herokuapp.com/my_review`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [token]);

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
