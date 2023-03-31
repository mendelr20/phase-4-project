import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function MyReviews({ recipes, user }) {
  const [sortOption, setSortOption] = useState("none");
  const [filterOption, setFilterOption] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearFilters = () => {
    setSortOption("none");
    setFilterOption("All");
    setSearchQuery("");
  };

  const mealCourses = [
    "All",
    ...new Set(recipes.map((recipe) => recipe.meal_course)),
  ].sort();

  const reviewedRecipes = recipes.filter((recipe) =>
    recipe.reviews.some((review) => review.user.id === user.id)
  );

  const sortedRecipes = [...reviewedRecipes].sort((a, b) => {
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
          placeholder="Search by the recipe name"
          onChange={handleSearchChange}
        />
        <button onClick={handleClearFilters}>Clear Filters</button>
      </FilterBar>

      {searchedRecipes.length > 0 ? (
        searchedRecipes.map((recipe) => (
          <Recipe key={recipe.id}>
            <Box>
              <Link to={`/recipes/${recipe.id}`}>
                <h2>{recipe.name}</h2>
              </Link>
              <p>
                <cite>{recipe.meal_course}</cite>
                &nbsp;·&nbsp;
                <em>Time to Complete: {recipe.minutes_to_complete} minutes</em>
              </p>
              <h3>Notes:</h3>
              <p>{recipe.notes}</p>
            </Box>
            <Button as={Link} className="see-more" to={`/recipes/${recipe.id}`}>
              See More
            </Button>
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
      {searchQuery !== "" && <Button onClick={() => setSearchQuery("")}>Clear Search</Button>}
      {sortOption !== "none" && (
        <Button onClick={() => setSortOption("none")}>Clear Sort By</Button>
      )}
      {filterOption !== "All" && (
        <Button onClick={() => setFilterOption("All")}>Clear Filter</Button>
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
  position: relative;

  .see-more {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #f8f8f8;
  padding: 8px;

  label {
    margin-right: 8px;
    font-weight: bold;
    color: #555;
  }

  select {
    padding: 4px;
    border-radius: 4px;
    border: none;
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
    margin-right: 8px;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #c9bfbf;
    }
  }

  input {
    padding: 4px;
    border-radius: 4px;
    border: none;
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
    margin-right: 10px;
    width: 250px;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #c9bfbf;
    }
  }
`;

export default MyReviews;
