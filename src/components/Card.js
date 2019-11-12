import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    maxHeight: 150
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  }
});

const MyCard = image => {
  const classes = useStyles();
  console.log(image);
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title={image.shoot}
          // image="https://bootstrap.dragns.net/preview/5d74d0b4c53b5eb6e0f56048"
          image={image.image}
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="h4" color="textSecondary">
          Title
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyCard;
