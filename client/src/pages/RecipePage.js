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
  const [editingReview, setEditingReview] = useState(null);

  const [errors, setErrors] = useState([]);
  
  const errDisplay = errors !== undefined ? <p className='make_red'>{
    errors.map((error) => {
      return <li key={error}>{error}</li>
    })}</p> : null
    console.log(errors)
  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          recipe_id: recipe.id,
          review_text: reviewText,
        }),
      })
  
      const responseData = await response.json();
  
      if (response.ok) {
        setRecipes((recipes) => {
          const updatedRecipes = recipes.map((recipe) => {
            const updatedReviews =
              recipe.id === responseData.recipe_id
                ? [...recipe.reviews, responseData]
                : recipe.reviews;
            return {
              ...recipe,
              reviews: updatedReviews,
            };
          });
          console.log(updatedRecipes)
          return updatedRecipes;
        });
  
        setReviewText("");
        setShowReviewForm(false);
        setErrors([]);
      } else {
        throw new Error(responseData);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };
  

  const handleReviewFormToggle = () => {
    setShowReviewForm(!showReviewForm);
  };
  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errors = await response.json();
        throw new Error(errors);
      }
      setRecipes((recipes) => {
        const updatedRecipes = recipes.map((recipe) => {
          const updatedReviews = recipe.reviews.filter(
            (review) => review.id !== reviewId
          );
          return {
            ...recipe,
            reviews: updatedReviews,
          };
        });
        return updatedRecipes;
      });
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const handleReviewDelete = (review) => {
    deleteReview(review.id);
    setShowReviewForm(false);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`/reviews/${editingReview.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review_text: editingReview.review_text }),
      });

      if (!response.ok) {
        const errors = await response.json();
        throw new Error(errors);
      }

      const updatedReview = await response.json();

      setRecipes((recipes) => {
        const updatedRecipes = recipes.map((recipe) => {
          const updatedReviews = recipe.reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          );
          return {
            ...recipe,
            reviews: updatedReviews,
          };
        });
        return updatedRecipes;
      });

      setEditingReview(null);
      setShowReviewForm(false);
      setErrors([]);
    } catch (error) {
      setErrors([error.message]);

    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true); // show the review form when editing
  };

  if (!recipe) {
    return <h2>Recipe not found</h2>;
  }

  return (
    <RecipePageWrapper>
      {errDisplay}
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
      {showReviewForm || editingReview ? (
        <ReviewFormWrapper>
          <ReviewFormTextArea
            value={editingReview ? editingReview.review_text : reviewText}
            onChange={(e) =>
              editingReview
                ? setEditingReview({
                    ...editingReview,
                    review_text: e.target.value,
                  })
                : setReviewText(e.target.value)
            }
            placeholder="Enter your review here..."
          />
          <ReviewFormButton
            onClick={editingReview ? handleEditSubmit : handleReviewSubmit}
          >
            {editingReview ? "Update Review" : "Submit Review"}
          </ReviewFormButton>
        </ReviewFormWrapper>
      ) : (
        <RecipePageButton onClick={handleReviewFormToggle}>
          Create a Review
        </RecipePageButton>
      )}
      <p>
      </p>
      {recipe.reviews.map((review) => (
        <Review key={review.id}>
          <p>{review.review_text}</p>
          <span>Review by: {review.user.username}</span>
          {review.user.id === user.id && (
            <>
            <p>
              <Button onClick={() => handleEditReview(review)}>Edit</Button>
            </p>
            <p> <Button onClick={() => handleReviewDelete(review)}>Delete</Button></p>
             
            </>
          )}
        </Review>
      ))}
      <RecipePageButton as={Link} to="/recipes">
        Back to Recipes
      </RecipePageButton>
    </RecipePageWrapper>
  );
};
// Styling for each review
const Review = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: 10px;
  }

  span {
    font-style: italic;
    font-size: 14px;
  }
`;

// Styling for review buttons
const ReviewButtons = styled.div`
  display: flex;
  gap: 10px;
`;

// Styling for recipe page button
const RecipePageButton = styled(Button)`
  margin-top: 20px;
`;

// Styling for the overall recipe page wrapper
const RecipePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px auto; /* add a margin to float the box in the center */
  max-width: 800px; /* add a max-width to prevent the box from stretching too wide */
`;

// Styling for recipe name
const RecipeName = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
`;

// Styling for meal course
const MealCourse = styled.h3`
  font-size: 24px;
  margin-bottom: 16px;
`;

// Styling for minutes to complete
const MinutesToComplete = styled.h3`
  font-size: 24px;
  margin-bottom: 16px;
`;

// Styling for notes section title
const NotesTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 8px;
`;

// Styling for notes section content
const Notes = styled.p`
  font-size: 18px;
  margin-bottom: 16px;
`;

// Styling for instructions section title
const InstructionsTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 8px;
`;

// Styling for instructions section content
const Instructions = styled.p`
  font-size: 18px;
  margin-bottom: 16px;
`;

// Styling for review form wrapper
const ReviewFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

// Styling for review form text area
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

// Styling for review form button
const ReviewFormButton = styled.button`
  background-color: #663399;
  margin-top: 10px;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 16px 32px;
  cursor: pointer;

  &:hover {
    background-color: #512b8b;
  }
`;

// Styling for reviews section title
const ReviewsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export default RecipePage;
