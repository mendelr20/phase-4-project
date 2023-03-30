import styled from "styled-components";
import { Button } from "../styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

const RecipePage = ({ recipes, setRecipes, user }) => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === Number(id));

  const [reviewText, setReviewText] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review: { text: reviewText } }),
      });

      if (!response.ok) {
        const errors = await response.json();
        throw new Error(errors);
      }

      const data = await response.json();

      setRecipes((recipes) =>
        recipes.map((r) => {
          if (r.id === data.recipe_id) {
            return {
              ...r,
              reviews: [...r.reviews, data.review],
            };
          } else {
            return r;
          }
        })
      );

      setReviewText("");
      setShowReviewForm(false);
      setErrors([]);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleReviewFormToggle = () => {
    setShowReviewForm(!showReviewForm);
  };

  if (!recipe) {
    return <h2>Recipe not found</h2>;
  }

  return (
    <RecipePageWrapper>
      <RecipeName>{recipe.name}</RecipeName>
      <MealCourse>Meal Course: {recipe.meal_course}</MealCourse>
      <MinutesToComplete>
        Minutes to Complete: {recipe.minutes_to_complete}
      </MinutesToComplete>
      <NotesTitle>Notes:</NotesTitle>
      <Notes>{recipe.notes}</Notes>
      <InstructionsTitle>Instructions:</InstructionsTitle>
      <Instructions>{recipe.instructions}</Instructions>
      <ReviewsTitle>Reviews:</ReviewsTitle>
      {showReviewForm ? (
        <ReviewFormWrapper>
          <ReviewFormTextArea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Enter your review here..."
          />
          <ReviewFormButton onClick={handleReviewSubmit}>
            Submit Review
          </ReviewFormButton>
        </ReviewFormWrapper>
      ) : (
        <RecipePageButton onClick={handleReviewFormToggle}>
          Create a Review
        </RecipePageButton>
      )}
      {recipe.reviews.map((review) => (
        <Review key={review.id}>
          <p>{review.review_text}</p>
          <span>Review by {review.user.username}</span>
        </Review>
      ))}
      <RecipePageButton as={Link} to="/recipes">
        Back to Recipes
      </RecipePageButton>
    </RecipePageWrapper>
  );
};

const RecipePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecipeName = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const MealCourse = styled.h3`
  font-size: 24px;
  margin-bottom: 16px;
`;

const MinutesToComplete = styled.h3`
  font-size: 24px;
  margin-bottom: 16px;
`;

const NotesTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 8px;
`;

const Notes = styled.p`
  font-size: 18px;
  margin-bottom: 16px;
`;

const InstructionsTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 8px;
`;

const Instructions = styled.p`
  font-size: 18px;
  margin-bottom: 16px;
`;

const ReviewFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const ReviewFormTextArea = styled.textarea`
  font-size: 18px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 16px;
  width: 100%;
  height: 150px;
`;

const ReviewFormButton = styled.button`
  background-color: #663399;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 16px 32px;
  cursor: pointer;

  &:hover {
    background-color: #512b8b;
  }
`;

const ReviewsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  p {
    font-size: 18px;
    margin-bottom: 8px;
  }

  span {
    font-size: 16px;
    color: #666;
  }
`;

const RecipePageButton = styled(Button)`
  margin-top: 48px;
  background-color: #663399;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 16px 32px;

  &:hover {
    background-color: #512b8b;
  }
`;

const Dropdown = styled.select`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 16px;
`;

const CreateViewButton = styled.button`
  margin-top: 48px;
  background-color: #663399;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 16px 32



&:hover {
background-color: #512b8b;
}
`;

const CreateViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const CreateViewTextArea = styled.textarea`
 font-size: 18px; 
 padding: 10px;
  border: 1px solid #ccc;
   border-radius: 4px;
    background-color: #fff;
     margin-bottom: 16px; 
     width: 100%; 
     height: 150px;
     `;

const CreateViewSubmitButton = styled.button`
background-color: #512b8b;
color: #fff;
border: none;
border-radius: 4px;
padding: 16px 32px;
margin-bottom: 24px;

&:hover {
background-color: #663399;
}
`;



export default RecipePage;
