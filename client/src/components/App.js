import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import RecipeList from "../pages/RecipeList";
import HomePage from "./HomePage";
import NewRecipe from "../pages/NewRecipe";
import About from "./About";
import RecipePage from "../pages/RecipePage";

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    fetch("/recipes")
        .then((r) => r.json())
        .then(setRecipes);
  }, []);

  if (!user) return <Login  onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewRecipe setRecipes={setRecipes} user={user} />
          </Route>
          <Route path="/recipes/:id">
            <RecipePage setRecipes={setRecipes} user={user} recipes={recipes} />
          </Route>
          <Route path="/recipes">
            <RecipeList recipes={recipes}/>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <HomePage recipes={recipes} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
