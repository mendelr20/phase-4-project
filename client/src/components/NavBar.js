import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import { UserContext } from "./App";

function NavBar() {
  const { user, setUser } = useContext(UserContext);

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">Recipe Ranger</Link>
      </Logo>
      <Nav>
        <Button as={Link} to="/">
          Home
        </Button>
        <Button variant="outline" as={Link} to="/about">
          About
        </Button>
        <Button as={Link} to="/myreviews">
          My Reviews
        </Button>
        <Button variant="outline" as={Link} to="/recipes">
          Recipes
        </Button>
        <Button as={Link} to="/new">
          New Recipe
        </Button>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout {user.username}
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: #663399;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;
