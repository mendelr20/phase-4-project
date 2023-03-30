import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [sortOption, setSortOption] = useState("none");
  const [filterOption, setFilterOption] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/recipes")
      .then((r) => r.json())
      .then(setRecipes);
  }, []);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const mealCourses = [
    "All",
    ...new Set(recipes.map((recipe) => recipe.meal_course)),
  ].sort();

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortOption === "timeAsc") {
      return a.minutes_to_complete - b.minutes_to_complete;
    } else if (sortOption === "timeDesc") {
      return b.minutes_to_complete - a.minutes_to_complete;
    } else if (sortOption === "mealAsc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "mealDesc") {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  const filteredRecipes =
    filterOption === "All"
      ? sortedRecipes
      : sortedRecipes.filter((recipe) => recipe.meal_course === filterOption);

  const searchedRecipes =
    searchQuery === ""
      ? filteredRecipes
      : filteredRecipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <Wrapper>
      <FilterBar>
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="none">--</option>
          <option value="timeAsc">Time to Complete: Low to High</option>
          <option value="timeDesc">Time to Complete: High to Low</option>
          <option value="mealAsc">Meal Name: A to Z</option>
          <option value="mealDesc">Meal Name: Z to A</option>
        </select>
        <label htmlFor="filter">Filter By:</label>
        <select id="filter" value={filterOption} onChange={handleFilterChange}>
          {mealCourses.map((mealCourse) => (
            <option key={mealCourse} value={mealCourse}>
              {mealCourse}
            </option>
          ))}
        </select>
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </FilterBar>

      {searchedRecipes.length > 0 ? (
        searchedRecipes.map((recipe) => (
          <Recipe key={recipe.id}>
            <Box>
              <h2>{recipe.name}</h2>
              <p>
                <cite>{recipe.meal_course}</cite>
                &nbsp;·&nbsp;
                <em>Time to Complete: {recipe.minutes_to_complete} minutes</em>
              </p>
              <h3>Notes:</h3>
              <p>{recipe.notes}</p>
              <h3>Instructions:</h3>
              <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
            </Box>
          </Recipe>
        ))
      ) : (
        <>
          <h2>No Recipes Found</h2>
          <Button as={Link} to="/new">
            Make a New Recipe
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

// const FilterBar = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-bottom: 16px;

//   label {
//     margin-right: 8px;
//   }
// `;

const FilterBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;

  label {
    margin-right: 8px;
  }

  input {
    margin-right: 8px;
    width: 80px;
  }
`;


export default RecipeList;
