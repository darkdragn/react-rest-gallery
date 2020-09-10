import { useQuery, gql } from "@apollo/client";
import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { withRouter, useParams } from "react-router-dom";
import Gallery from "react-grid-gallery";

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

const GalleryComponent = () => {
  const { person, shoot } = useParams();
  const { loading, error, data } = useQuery(SHOOT_QUERY, {
    variables: { person, shoot }
  });

  if (loading)
    return (
      <Typography align="center" component="p" variant="h3" className="center">
        Loading...
      </Typography>
    );

  if (error) return <Typography component="p"> {error} </Typography>;
  const images = data.imageMany;
  const cards = images.map((image) => {
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
  });
  return (
    <Paper>
      <Typography component="p" />
      <Gallery
        images={cards}
        backdropClosesModal={true}
        showLightboxThumbnails={true}
      />
    </Paper>
  );
};

export default withRouter(GalleryComponent);
