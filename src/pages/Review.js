import { useParams, useNavigate } from "react-router";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";

const Review = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  // 2 A la soumission du formulaire faire une requête axios vers le backend
  // 3 Rediriger le client vers la fiche du jeu en question

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://gamepad-by-thomas.onrender.com/review/${id}`,
        {
          title,
          description: text,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.user.userToken}`,
          },
        }
      );
      console.log(response.data);
      navigate(`/detail/${id}`);
    } catch (error) {
      console.log(error.message);
      alert(`You have already writed a review ont this game.`);
    }
  };

  return (
    <div className="review-wrapper">
      <div className="review-header">
        <h4>Write a review</h4>
        <span onClick={() => navigate(`/detail/${id}`)}>X</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="review-input-wrapper">
          <label htmlFor="review-title">Review title</label>
          <input
            type="text"
            name="review-title"
            id="review-title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="review-input-wrapper">
          <label htmlFor="review-text">Review text</label>
          <textarea
            rows="5"
            type="text"
            name="review-text"
            id="review-text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>

        <div className="submit-container">
          <input className="submit-review" type="submit" value="Publish" />
        </div>
      </form>
    </div>
  );
};

export default Review;
