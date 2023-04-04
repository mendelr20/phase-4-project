import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import RecipeList from "../pages/RecipeList";
import HomePage from "./HomePage";
import NewRecipe from "../pages/NewRecipe";
import About from "./About";
import MyReviews from "../pages/MyReviews";
import RecipePage from "../pages/RecipePage";

// create a context for the user
export const UserContext = React.createContext();

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

  if (!user) return <Login onLogin={setUser} />;

  return (
    // wrap the app in the user context provider
    <UserContext.Provider value={{ user, setUser }}>
      <>
        <NavBar />
        <main>
          <Switch>
            <Route path="/new">
              <NewRecipe setRecipes={setRecipes} />
            </Route>
            <Route path="/myreviews">
              <MyReviews recipes={recipes} />
            </Route>
            <Route path="/recipes/:id">
              <RecipePage
                setRecipes={setRecipes}
                user={user}
                recipes={recipes}
              />
            </Route>
            <Route path="/recipes">
              <RecipeList recipes={recipes} />
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
    </UserContext.Provider>
  );
}

export default App;
