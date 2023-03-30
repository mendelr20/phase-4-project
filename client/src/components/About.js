import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1 >Welcome to My About Page</h1>
      <nav>
            Get Started and see the recipes
          <h3><Link to="/recipes">Recipe List</Link></h3>
      </nav>
    </div>
  );
}

export default HomePage;