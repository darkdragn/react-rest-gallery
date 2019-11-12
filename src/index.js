import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home, Navbar, Test, MyGrid, MyGridList, Gallery } from "./components";
// import "./styles.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/test" component={Test} />
            <Route path="/grid" component={MyGrid} />
            <Route path="/gridlist" component={MyGridList} />
            <Route path="/gallery/:person/:album" component={Gallery} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
