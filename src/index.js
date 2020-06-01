import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";

import { Home, MyNavbar, MyGridList, Gallery, GridModel } from "./components";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <CssBaseline />
            <MyNavbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/gridlist" component={MyGridList} />
              <Route path="/grid/:model" component={GridModel} />
              <Route path="/gallery/:person/:album" component={Gallery} />
            </Switch>
          </React.Fragment>
        </MuiThemeProvider>
      </HashRouter>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
