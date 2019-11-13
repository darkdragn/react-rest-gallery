import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";

import { Home, MyNavbar, MyGridList, Gallery } from "./components";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <CssBaseline />
            <MyNavbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/gridlist" component={MyGridList} />
              <Route path="/gallery/:person/:album" component={Gallery} />
            </Switch>
          </React.Fragment>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
