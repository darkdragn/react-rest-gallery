import React from "react";
import { Component } from "react";
import { Container, Grid } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

import MyCard from "./MyCard";

const StyledContainer = styled(Container)({
  flexGrow: 1
});

class MyGrid extends Component {
  state = {
    images: []
  };

  componentDidMount() {
    fetch("https://bootstrap.dragns.net/api/covers")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ images: data });
      })
      .catch((error, response) => {
        console.log(error);
        console.log(response);
      });
    console.log("Here");
  }

  render() {
    const { images } = this.state;
    const cards = images.length ? (
      images.map(image => {
        return (
          <Grid item xs={4}>
            <MyCard image={image} />
          </Grid>
        );
      })
    ) : (
      <div />
    );

    // console.log(images);
    return (
      <StyledContainer>
        <Grid container spacing={2} id="Images">
          {cards}
        </Grid>
      </StyledContainer>
    );
  }
}

export default MyGrid;
