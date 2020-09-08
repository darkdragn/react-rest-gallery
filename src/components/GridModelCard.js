import { Link, withRouter, useParams } from "react-router-dom";
import {
  Container,
  GridListTile,
  GridListTileBar,
  GridList,
  ListSubheader,
  Paper,
  Typography
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { useQuery, gql } from "@apollo/client";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const SHOOT_QUERY = gql`
  query Model($model: String!) {
    imageShoots(model: $model) {
      person
      name
      shoot
      source
      thumbnail
    }
  }
`;

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

const MakeCard = ({ images, loading, model }) => {
  return (
    <StyledContainer>
      <Paper>
        <StyledGridList cellHeight={280} cols={3}>
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
          {images.map((tile, index) => {
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
          })}
        </StyledGridList>
      </Paper>
    </StyledContainer>
  );
  // });
};

const Card = () => {
  const { model } = useParams();
  const { loading, error, data } = useQuery(SHOOT_QUERY, {
    variables: { model: model }
  });
  // var state = {}
  if (loading) {
    const state = {
      images: Array.from(new Array(9)),
      loading: true,
      model: "Loading"
    };
    return MakeCard(state);
  }
  if (error) return <div />;
  if (data) {
    const state = {
      images: data.imageShoots,
      loading: false,
      model: model
    };
    return MakeCard(state);
  }
};

export default withRouter(Card);
