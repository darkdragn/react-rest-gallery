import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  Typography,
  Paper
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
// import GridTile from "./GridTile";

const StyledGridList = styled(GridList)({
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  }
});

const StyledContainer = styled(Container)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  overflow: "hidden"
});

class GridModel extends Component {
  state = {
    images: Array.from(new Array(9)),
    loading: true,
    model: "Loading"
  };

  getData = () => {
    let { model } = this.props.match.params;
    fetch("https://bootstrap.dragns.net/api/covers/" + model)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ images: data, loading: false, model: model });
      })
      .catch((error, response) => {
        console.log(error);
        console.log(response);
      });
  };
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.getData();
  }

  render() {
    const { images, loading, model } = this.state;
    const cards2 = images.map((tile, index) => {
      let link = loading
        ? "/gallery"
        : "/gallery/" + tile.person + "/" + tile.shoot;
      return (
        <GridListTile key={index} component={Link} to={link}>
          {tile ? (
            <img src={tile.thumbnail} alt={tile.name} />
          ) : (
            <Skeleton variant="rect" width={800} height={600} />
          )}
          {tile ? (
            <GridListTileBar
              title={tile.shoot}
              subtitle={<span>by: {tile.source}</span>}
            />
          ) : (
            <GridListTileBar title="Loading" subtitle="Loading" />
          )}
        </GridListTile>
      );
    });

    return (
      <StyledContainer>
        <Paper>
          <StyledGridList cellHeight={220} cols={3}>
            <GridListTile
              key="Subheader"
              cols={3}
              style={{ height: 60, padding: "5px 0" }}
              className="center"
            >
              <ListSubheader color="inherit">
                <Typography
                  component="p"
                  align="center"
                  variant="h3"
                  color="textPrimary"
                >
                  {model}
                </Typography>
              </ListSubheader>
            </GridListTile>
            {cards2}
          </StyledGridList>
        </Paper>
      </StyledContainer>
    );
  }
}

export default withRouter(GridModel);
