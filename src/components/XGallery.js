import React from "react";
import ImageGallery from "react-image-gallery";

class Gallery extends React.Component {
  // const
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
  }
  render() {
    const { images } = this.state;
    const cards = images.length
      ? images.map(image => {
          return {
            original: "https://bootstrap.dragns.net" + image.link,
            thumbnail: image.thumbnail
          };
        })
      : [];

    return <ImageGallery items={cards} />;
  }
}

export default Gallery;
