import React from "react";
import { Container } from "@material-ui/core";
import Gallery from "react-grid-gallery";

class MyGallery extends React.Component {
  const;
  state = {
    images: []
  };

  componentDidMount() {
    // console.log(this.props);
    let { person, album } = this.props.match.params;
    let url = "https://bootstrap.dragns.net/api/" + person + "/" + album;
    // console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
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
      ? images.map(image => {
          return {
            src: "https://bootstrap.dragns.net" + image.link,
            caption: image.name,
            subcaption: image.source,
            thumbnail: image.thumbnail
          };
        })
      : [];

    return (
      <Container>
        <p />
        <Gallery images={cards} />
      </Container>
    );
  }
}

export default MyGallery;
