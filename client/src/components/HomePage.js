import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function HomePage({ recipes }) {
  const featuredRecipes = recipes.length > 0 ? recipes.slice(0, 4) : [];  // display the first 4 recipes as featured recipes

  return (
    <Wrapper>
      <Title>Welcome to Recipe Ranger</Title>
      <FeaturedRecipes>
        {featuredRecipes.map((recipe) => (
          <Recipe key={recipe.id}>
            <Box>
              <h2>{recipe.name}</h2>
              <p>
                <cite>{recipe.meal_course}</cite>
                &nbsp;·&nbsp;
                <em>Time to Complete: {recipe.minutes_to_complete} minutes</em>
              </p>
              <Button
                as={Link}
                className="see-more"
                to={`/recipes/${recipe.id}`}
              >
                See More
              </Button>
            </Box>
          </Recipe>
        ))}
      </FeaturedRecipes>
      <SeeAllRecipesButton as={Link} to="/recipes">
        See All Recipes
      </SeeAllRecipesButton>
      <ContactInformation>
        <h5>
          <a href="https://github.com/mendelr20">Mendel Rosenblum</a>
          <br />
          <br />
          <a href="tel:973-650-4936">Number: 973-650-4936</a>
          <br />
          <br />
          <a href="mailto:rosenblummm@gmail.com">
            Email: Rosenblummm@gmail.com
          </a>
        </h5>
      </ContactInformation>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ContactInformation = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h5 {
    font-size: 18px;
    text-align: center;

    a {
      color: #663399;
      text-decoration: none;
      margin-bottom: 8px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #663399;
  text-align: center;
  margin-bottom: 48px;
`;

const FeaturedRecipes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Recipe = styled.article`
  margin-right: 24px;
  margin-bottom: 24px;
  width: calc(33.33% - 8px);

  &:nth-child(3n) {
    margin-right: 0;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 16px;
  }
`;

const SeeAllRecipesButton = styled(Button)`
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

export default HomePage;
