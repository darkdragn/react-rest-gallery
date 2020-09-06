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
// import { Container, MenuIcon } from "@material-ui/core";

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
  // console.log(data);
  const modelList = () => {
    if (loading)
      return (
        <ListItem>
          <ListItemText primary="Loading ..." />
        </ListItem>
      );
    // console.log(loading);
    // console.log(error);
    // console.log(data);
    return data.imageDistinct.map((model) => {
      let link = "/grid/" + model.person;
      return (
        <ListItem button component={NavLink} to={link} key={model.person}>
          <ListItemText primary={model.person} />
        </ListItem>
      );
    });
  };
  // console.log(modelList)
  const sideList = () => {
    const side = "left";
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          {/* <ListItem button component={NavLink} to="/gridlist" key="Models">
            <ListItemText primary="Models" />
          </ListItem> */}
          {modelList()}
        </List>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
      <AppBar position="sticky" color="default">
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
            QuickImageViewer
          </Typography>
          <Button component={NavLink} to="/gridlist" color="inherit">
            Grid
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(MyNavbar);
