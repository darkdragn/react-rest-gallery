import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";

import {
  Cards,
  CoolLightBox,
  Home,
  MyNavbar,
  Gallery,
  SpringGallery
} from "./components";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import GridModelCard from "./components/GridModelCard";

const graph_url =
  process.env.NODE_ENV === "development"
    ? "https://bootstrap.dragns.net/graphql"
    : "/graphql";

const client = new ApolloClient({
  uri: graph_url,
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
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <React.Fragment>
              <CssBaseline />
              <MyNavbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/gridlist" component={GridModelCard} />
                <Route exact path="/spring" component={CoolLightBox} />
                <Route path="/spring/:model/:shoot" component={SpringGallery} />
                <Route
                  path="/grid/:model"
                  render={(props) => (
                    <Cards key={props.match.params.model} {...props} />
                  )}
                />
                <Route path="/gallery/:person/:shoot" component={Gallery} />
                {/* <Route path="/comic/:person/:shoot" component={Comic} /> */}
              </Switch>
            </React.Fragment>
          </ApolloProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
