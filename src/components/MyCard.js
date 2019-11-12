import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  styled
} from "@material-ui/core";

const StyCard = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%"
});

class MyCard extends Component {
  render() {
    const { thumbnail, shoot } = this.props.image;
    return (
      <Card>
        <CardActionArea>
          <StyCard title={shoot} image={thumbnail} />
        </CardActionArea>
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {shoot}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default MyCard;
