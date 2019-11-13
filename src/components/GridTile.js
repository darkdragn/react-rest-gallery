import React, { Component } from "react";
import { GridListTile, GridListTileBar } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Link } from "react-router-dom";

class GridTile extends Component {
  render() {
    const { loading, tile, index, ref } = this.props;
    let link = loading
      ? "/gallery"
      : "/gallery/" + tile.person + "/" + tile.shoot;
    return (
      <GridListTile key={index} component={Link} to={link} ref={ref}>
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
  }
}

GridTile.muiName = GridListTile.muiName;
export default GridTile;
