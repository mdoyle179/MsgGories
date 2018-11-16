import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../actions/itemActions";
import AppNavbar from "./AppNavbar";

import PropTypes from "prop-types";

class CategoriesList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    const div = document.getElementById("itemList");
    ReactDOM.render(<AppNavbar />, div);
    this.props.deleteItem(id);
    console.log("div created?" + div.id);
  };

  render() {
    const { items } = this.props.itemsReducerInstance;
    return (
      <Container id="itemList">
        <ListGroup>
          <TransitionGroup>
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem className="overallLook">
                  {/* <Button
                    id="ElBoton"
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, id)}
                  >
                    &times;
                  </Button> */}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

CategoriesList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  itemsReducerInstance: state.itemsReducerInstance
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, addItem }
)(CategoriesList);
