import { Link, NavLink, withRouter } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useQuery, gql } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 20
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  }
}));

const MyNavbar = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const MODELS = gql`
    query {
      imageDistinct(field: "person") {
        person
      }
    }
  `;
  const { loading, error, data } = useQuery(MODELS);

  const ModelList = () => {
    if (loading)
      return (
        <ListItem>
          <ListItemText primary="Loading ..." />
        </ListItem>
      );
    if (error) console.log(error);
    return data.imageDistinct.map((model) => {
      let link = "/grid/" + model.person;
      return (
        <ListItem button component={NavLink} to={link} key={model.person}>
          <ListItemText primary={model.person} />
        </ListItem>
      );
    });
  };

  const SideList = () => {
    const side = "left";
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          <ModelList />
        </List>
      </div>
    );
  };

  return (
      <AppBar position="sticky" color="default">
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        <SideList />
      </Drawer>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="textPrimary"
          >
            DragnGallery
          </Typography>
          <Button component={NavLink} to="/spring" color="inherit">
            Spring
          </Button>
          <Button component={NavLink} to="/gridlist" color="inherit">
            Grid
          </Button>
        </Toolbar>
      </AppBar>
  );
};

export default withRouter(MyNavbar);
