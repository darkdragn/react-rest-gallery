import React, { Component } from "react";
import { Container } from "@material-ui/core";
import MyCard from "./MyCard";
// import axios from "axios";

// const images = [
//   {
//     title: "Preview Image",
//     image: "https://via.placeholder.com/150/92c952"
//   },
//   {
//     title: "Riversong",
//     image: "https://bootstrap.dragns.net/preview/5d74d0b4c53b5eb6e0f56048"
//   }
// ];

// const cards = images.map(image => {
//   return <MyCard image={image} />;
// });
class MyCards extends Component {
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
          <Container>
            <MyCard image={image} />;
          </Container>
        );
      })
    ) : (
      <div />
    );

    // console.log(images);
    return <Container id="Images">{cards}</Container>;
  }
}

export default MyCards;
