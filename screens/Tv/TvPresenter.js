import React from "react";
import styled from "styled-components/native";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import Vertical from "../../components/Vertical";
import List from "../../components/List";
import Horizontal from "../../components/Horizontal";

const Container = styled.View`
 margin-top: 30px;
`;

export default ({ refreshFn, loading, popular, topRated, today }) => (
 <ScrollContainer refreshFn={refreshFn} loading={loading}>
  <Container>
   <HorizontalSlider title="Popular Shows">
    {popular.map((show) => (
     <Vertical
      id={show.id}
      key={show.id}
      poster={show.poster_path}
      title={show.name}
      votes={show.vote_average}
     />
    ))}
   </HorizontalSlider>
   <HorizontalSlider title="Top Rated">
    {topRated.map((show) => (
     <Vertical
      id={show.id}
      key={show.id}
      poster={show.poster_path}
      title={show.name}
      votes={show.vote_average}
     />
    ))}
   </HorizontalSlider>
   <List title="Airing Today">
    {today.map((show) => (
     <Horizontal
      key={show.id}
      id={show.id}
      title={show.name}
      poster={show.poster_path}
      overview={show.overview}
     />
    ))}
   </List>
  </Container>
 </ScrollContainer>
);
