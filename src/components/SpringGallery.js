import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import Lightbox from "react-spring-lightbox";
import { useQuery, gql } from "@apollo/client";
import {
  IconButton,
  GridList,
  GridListTile,
  Typography
} from "@material-ui/core";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

const SHOOT_QUERY = gql`
  query Query($person: String!, $shoot: String!) {
    imageMany(filter: { person: $person, shoot: $shoot }, sort: NAME_ASC) {
      person
      name
      shoot
      source
      thumbnail
      t_width
    }
  }
`;

const SpringGallery = () => {
  const location = useLocation();
  var { model, shoot } = useParams();
  const router = { query: queryString.parse(location.search) };
  const start = router.query.index ? router.query.index : 41;

  const [currentImageIndex, setCurrentIndex] = useState(start);
  const [lightOpen, setLightOpen] = useState(false);
  console.log(lightOpen);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  const { loading, error, data } = useQuery(SHOOT_QUERY, {
    variables: { person: model, shoot: shoot }
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
      alt: image.name,
      thumbnail: image.thumbnail,
      cols: image.t_width === 800 ? 2 : 1
    };
  });

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightOpen(true);
  };

  return (
    <>
      <GridList cellHeight={280} cols={6}>
        {cards.map((tile, index) => (
          <GridListTile
            key={tile.alt}
            component={"div"}
            cols={2}
            onClick={(e) => openLightbox(index)}
          >
            <img src={tile.thumbnail} alt={tile.alt} />
          </GridListTile>
        ))}
      </GridList>
      <Lightbox
        isOpen={lightOpen}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={cards}
        currentIndex={currentImageIndex}
        renderPrevButton={() => (
          <Typography align="left" style={{ flex: 1 }}>
            <IconButton
              onClick={gotoPrevious}
              style={{ zIndex: 10, position: "left" }}
              size="medium"
              edge="start"
              position="left"
              variant="contained"
            >
              <ArrowLeft />
            </IconButton>
          </Typography>
        )}
        renderNextButton={() => (
          <IconButton
            onClick={gotoNext}
            style={{ zIndex: 10, position: "left" }}
            size="medium"
            edge="end"
            position={"left"}
          >
            <ArrowRight />
          </IconButton>
        )}
        singleClickToZoom
      />
    </>
  );
};

export default SpringGallery;
