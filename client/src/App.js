import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import CategoriesList from "./components/CategoriesList";
import ItemModal from "./components/ItemModal";
import Players from "./components/Players";

import Timer from "./components/Timer";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <Players/>
            <CategoriesList />
            <Timer />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
