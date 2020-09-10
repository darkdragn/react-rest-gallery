// import ComicBookViewer from "react-native-comic-book-viewer";
// import { useQuery, gql } from "@apollo/client";
// import { useParams } from "react-router-dom";
// import { Typography } from "@material-ui/core";

// const SHOOT_QUERY = gql`
//   query Query($person: String!, $shoot: String!) {
//     imageMany(filter: { person: $person, shoot: $shoot }) {
//       person
//       name
//       shoot
//       source
//       t_width
//       t_height
//       thumbnail
//     }
//   }
// `;

// const Comic = () => {
//   const { person, shoot } = useParams();
//   const title = shoot;
//   const { loading, error, data } = useQuery(SHOOT_QUERY, {
//     variables: { person, shoot }
//   });

//   if (loading)
//     return (
//       <Typography align="center" component="p" variant="h3" className="center">
//         Loading...
//       </Typography>
//     );

//   if (error) return <Typography component="p"> {error} </Typography>;

//   const pages = data.imageMany.map((item, index) => {
//     const { name } = item;
//     return `https://bootstrap.dragns.net/photos/byShoot/${person}/${shoot}/${name}`;
//   });
//   return (
//     <ComicBookViewer
//       title={title}
//       inputType={"uri"}
//       pages={pages}
//       pubYear={2020}
//       totalPages={pages.length}
//       issueNumber={1}
//       // onClose={(index) => console.log(index)}
//       imageWidth={720}
//       imageHeight={1280}
//       // onPageChange={(index) => console.log(index)}
//     />
//   );
// };

// export default Comic;
