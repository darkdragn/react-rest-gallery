import React from "react";
// import { Component } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// import MyCard from "./MyCard";
import MyCards from "./MyCards";

const useStyles = makeStyles({
  container: {
    paddingTop: 25
  }
});

const Test = () => {
  const classes = useStyles();
  const divClass = classes.container;

  return (
    <Container className={divClass}>
      {/* <MyCard image={image} /> */}
      <MyCards />
    </Container>
  );
};

export default Test;
