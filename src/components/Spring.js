import React, { useState } from "react";
import Lightbox from "react-spring-lightbox";
import { useQuery, gql } from "@apollo/client";
import { Typography } from "@material-ui/core";

const SHOOT_QUERY = gql`
  query Query($person: String!, $shoot: String!) {
    imageMany(filter: { person: $person, shoot: $shoot }, sort: NAME_ASC) {
      person
      name
      shoot
      source
      t_width
      t_height
      thumbnail
    }
  }
`;

const CoolLightbox = () => {
  const [currentImageIndex, setCurrentIndex] = useState(41);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  const { loading, error, data } = useQuery(SHOOT_QUERY, {
    variables: { person: "Bae", shoot: "Shrine" }
  });

  if (loading) {
    return (
      <Typography align="center" component="p" variant="h3" className="center">
        Loading...
      </Typography>
    );
  }

  if (error) return <Typography component="p"> {error} </Typography>;
  const images = data.imageMany;
  const cards = images.map((image) => {
    const { name, shoot, person } = image;
    const link = `https://bootstrap.dragns.net/photos/byShoot/${person}/${shoot}/${name}`;
    return {
      src: link,
      alt: image.name
    };
  });

  return (
    <Lightbox
      isOpen={true}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={cards}
      currentIndex={currentImageIndex}
      /* Add your own UI */
      // renderHeader={() => (<CustomHeader />)}
      // renderFooter={() => (<CustomFooter />)}
      // renderPrevButton={() => (<CustomLeftArrowButton />)}
      // renderNextButton={() => (<CustomRightArrowButton />)}
      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      /* Add styling */
      // className="cool-class"
      // style={{ background: "grey" }}

      /* Handle closing */
      // onClose={handleClose}

      /* Use single or double click to zoom */
      singleClickToZoom

      /* react-spring config for open/close animation */
      // pageTransitionConfig={{
      //   from: { transform: "scale(0.75)", opacity: 0 },
      //   enter: { transform: "scale(1)", opacity: 1 },
      //   leave: { transform: "scale(0.75)", opacity: 0 },
      //   config: { mass: 1, tension: 320, friction: 32 }
      // }}
    />
  );
};

export default CoolLightbox;
