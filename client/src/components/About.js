import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function AboutPage() {
  return (
    <Wrapper>
      <BoxShadow>
        <Title>About Recipe Ranger</Title>
        <ContentWrapper>
          <Description>
            Recipe Ranger is a web application that allows users to find recipes
            and save them for later. Users can create an account, log in, and
            search for recipes based on keywords or ingredients. The application
            also allows users to view recipe details, add reviews, and edit or
            delete reviews they have previously submitted.
          </Description>
          <Button as={Link} to="/recipes">See Recipe List</Button>
        </ContentWrapper>
      </BoxShadow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const BoxShadow = styled(Box)`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Description = styled.p`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
`;

export default AboutPage;
