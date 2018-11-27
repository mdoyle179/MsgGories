import React, { Component } from "react";
import CategoriesList from "./components/CategoriesList";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Splash from "./components/Splash";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="App">
          <Container>
            <Splash/>
            <CategoriesList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
