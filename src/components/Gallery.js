import React from "react";
import { Paper, Typography } from "@material-ui/core";
import Gallery from "react-grid-gallery";

class MyGallery extends React.Component {
  state = {
    images: []
  };

  componentDidMount() {
    let { person, album } = this.props.match.params;
    let url = "https://bootstrap.dragns.net/api/" + person + "/" + album;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
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
      ? images.map((image) => {
          const { name, shoot, person } = image;
          const link = `/photos/byShoot/${person}/${shoot}/${name}`;
          return {
            src: link,
            caption: image.name,
            subcaption: image.source,
            thumbnail: image.thumbnail,
            thumbnailWidth: image.t_width,
            thumbnailHeight: image.t_height
          };
        })
      : [];

    return (
      <Paper>
        <Typography component="p" />
        <Gallery images={cards} backdropClosesModal={true} />
      </Paper>
    );
  }
}

export default MyGallery;
