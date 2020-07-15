import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions, ActivityIndicator, View } from "react-native";
import Slide from "../../components/Movies/Slide";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
 flex: 1;
 background-color: black;
 justify-content: center;
`;

const SliderContainer = styled.View`
 width: ${WIDTH}px;
 height: ${HEIGHT / 4}px;
 margin-bottom: 50px;
`;

export default ({ loading, nowPlaying }) => (
 <Container>
  {loading ? (
   <ActivityIndicator color="white" size="large" />
  ) : (
   <SliderContainer>
    <Swiper controlsEnabled={false} loop timeout={3}>
     {nowPlaying.map((movie) => (
      <Slide
       key={movie.id}
       id={movie.id}
       title={movie.original_title}
       overview={movie.overview}
       votes={movie.vote_average}
       backgroundImage={movie.backdrop_path}
       poster={movie.poster_path}
      ></Slide>
     ))}
    </Swiper>
   </SliderContainer>
  )}
 </Container>
);
