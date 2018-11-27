import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Tooltip
} from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import { connect } from "react-redux";
import {
  getItems,
  getPlayers
} from "../actions/itemActions";
import Timer from "./Timer";
import DiceRoller from "./DiceRoller";
import PropTypes from "prop-types";
import Players from "./Players";

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
  toggle(event) {

    var tooltipArray = this.state.toolTips;
    tooltipArray[event.srcElement.id] = !tooltipArray[event.srcElement.id];


    console.log(event.srcElement.id);
    console.log(this.state.toolTips[event.srcElement.id]);
    this.setState({
      toolTips: tooltipArray
    });
  }


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

                    {/* <input id={"inputX" + itemIndex} type="text" placeholder={name} autofocus></input> */}

                    {/* <Tooltip id={"tooltip" + itemIndex} className="toolTip" placement="right" isOpen={this.state.toolTips["inputX" + itemIndex]} target={"inputX" + itemIndex} toggle={this.toggle}> */}
                    {name} 
                    {/* </Tooltip> */}
                

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
  { getItems, getPlayers }
)(CategoriesList);
