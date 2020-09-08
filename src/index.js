import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";

import { Cards, Home, MyNavbar, Gallery } from "./components";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import GridModelCard from "./components/GridModelCard";

const client = new ApolloClient({
  uri: "https://bootstrap.dragns.net/graphql",
  cache: new InMemoryCache()
});

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
          <ApolloProvider client={client}>
            <React.Fragment>
              <CssBaseline />
              <MyNavbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/gridlist" component={GridModelCard} />
                <Route
                  path="/grid/:model"
                  render={(props) => (
                    <Cards key={props.match.params.model} {...props} />
                  )}
                />
                <Route path="/gallery/:person/:shoot" component={Gallery} />
              </Switch>
            </React.Fragment>
          </ApolloProvider>
        </MuiThemeProvider>
      </HashRouter>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
