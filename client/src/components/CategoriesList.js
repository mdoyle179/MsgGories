import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Tooltip
} from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import { connect } from "react-redux";
import {
  getItems,
  deleteItem,
  addItem,
  getPlayers
} from "../actions/itemActions";
import AppNavbar from "./AppNavbar";
import Timer from "./Timer";
import DiceRoller from "./DiceRoller";

import PropTypes from "prop-types";
import Players from "./Players";
import Splash from "./Splash";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    const { items } = this.props.itemsReducerInstance;

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
      toolTips: {}
    };
    for (var i = 0; i < items.length; i++) {
      this.state.toolTips["inputX" + i] = false;
    }
  }

  componentDidMount() {
    this.props.getItems();
    this.props.getPlayers();
  }
  toggle(agID) {
    this.state.toolTips[agID.srcElement.id] = !this.state.toolTips[
      agID.srcElement.id
    ];
    console.log(agID.srcElement.id);
    console.log(this.state.toolTips[agID.srcElement.id]);
    this.setState({
      toolTips: this.state.toolTips
    });
  }
  onDeleteClick = id => {
    const div = document.getElementById("itemList");
    ReactDOM.render(<AppNavbar />, div);
    this.props.deleteItem(id);
    console.log("div created?" + div.id);
  };

  render() {
    const { items } = this.props.itemsReducerInstance;

    var itemIndex = 0;
    return (
      <Container id="itemList">
        <div id="logoPic" />
        <div id="logo">MsgGories</div>
        <div id="stage">
          <ListGroup>
            <TransitionGroup>
              {items.map(({ id, name }) => (
                <CSSTransition key={id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {/* <Button
                    id="ElBoton"
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, id)}
                  >
                    &times;
                  </Button> */}

                    {/* <input id={"inputX"+itemIndex} type="text" placeholder= {name} autofocus></input>

                 <Tooltip id={"tooltip" + itemIndex} className="toolTip" placement="right" isOpen={this.state.toolTips["inputX"+itemIndex]} target={"inputX"+itemIndex} toggle= {this.toggle}/> */}
                    {name}

                    <div style={{ display: "none" }}>{itemIndex++}</div>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </div>

        <Timer />
        <DiceRoller />
        <Players />
        {/* <Splash /> */}
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
  { getItems, deleteItem, addItem, getPlayers }
)(CategoriesList);
