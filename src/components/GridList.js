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

const StyledContainer = styled(Container)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  overflow: "hidden",
  paddingTop: 20
});

class MyGridList extends Component {
  state = {
    images: []
  };

  componentDidMount() {
    fetch("https://bootstrap.dragns.net/api/covers")
      .then(response => response.json())
      .then(data => {
        this.setState({ images: data });
      })
      .catch((error, response) => {
        console.log(error);
        console.log(response);
      });
  }
  render() {
    const { images } = this.state;
    const cards = images.length
      ? images.map(tile => {
          let link = "/gallery/" + tile.person + "/" + tile.shoot;
          return (
            <GridListTile key={tile.shoot} component={Link} to={link}>
              <img src={tile.thumbnail} alt={tile.name} />
              <GridListTileBar
                title={tile.shoot}
                subtitle={<span>by: {tile.source}</span>}
              />
            </GridListTile>
          );
        })
      : [];

    return (
      <StyledContainer>
        <Paper>
          <GridList cellHeight={220} cols={3}>
            <GridListTile
              key="Subheader"
              cols={3}
              style={{ height: "auto" }}
              className="center"
            >
              <ListSubheader component="div" color="inherit">
                <Typography variant="h3" color="textPrimary">
                  Riversong
                </Typography>
              </ListSubheader>
            </GridListTile>
            {cards}
          </GridList>
        </Paper>
      </StyledContainer>
    );
  }
}

export default withRouter(MyGridList);
