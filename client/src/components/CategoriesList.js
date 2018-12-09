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
  getItems, getPlayers
} from "../actions/gameActions";
import Timer from "./Timer";
import DiceRoller from "./DiceRoller";
import PropTypes from "prop-types";
import Players from "./Players";
import { GET_ITEMS } from "../actions/types"
import Ready from "./Ready";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    const { currentCategories } = this.props.gameReducerInstance;

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
      toolTips: {},
      answersObject: {}
    };
    for (var i = 0; i < currentCategories.length; i++) {
      this.state.toolTips["inputX" + i] = false;
    }

    //this.initAnswersArray(currentCategories);
  }

  onChange = e => {
    console.log(e.target.name + " " + e.target.value);

    var answersObject = this.state.answersObject;

    answersObject[e.target.name] = e.target.value;
    this.setState({ "answersObject": answersObject });
  };
  componentDidMount = () => {
    console.log("mounting Cats List Component")
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

  onSubmit = e => {
    console.log("submitting");
    e.preventDefault();
    console.log(this.state.answersObject);

  }

  renderSubmit = () => {
    const { gameStarted } = this.props.gameReducerInstance;
    if (gameStarted) return (

      <div><button >Submit Answers</button></div>
    )
    else return null
  }
  renderCategoryItem = (name, itemIndex) => {
    const { action } = this.props.gameReducerInstance;
    const { gameStarted } = this.props.gameReducerInstance;

    if (gameStarted) {
      return (
        <div>
          <input name={itemIndex} id={"inputX" + itemIndex} onBlur={this.onChange} type="text" placeholder={name} autofocus ></input>
          <Tooltip id={"tooltip" + itemIndex} className="toolTip" placement="right" isOpen={this.state.toolTips["inputX" + itemIndex]} target={"inputX" + itemIndex} toggle={this.toggle}>
            {name}
          </Tooltip>
        </div>
      );
    }
    else {
      return <div>{name}</div>;
    }

  }

  render() {
    const { currentCategories } = this.props.gameReducerInstance;

    var itemIndex = 0;
    return (
      <Container id="itemList">
        <div id="logoPic" />
        <div id="logo">MsgGories</div>
        <form onSubmit={this.onSubmit}>
          <div id="stage">

            <ListGroup>
              <TransitionGroup>
                {currentCategories.map(({ id, name }) => (
                  <CSSTransition key={id} timeout={500} classNames="fade">
                    <ListGroupItem>

                      {this.renderCategoryItem(name, itemIndex)}


                      <div style={{ display: "none" }}>{itemIndex++}</div>
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
 
          </div>
          {this.renderSubmit()}
        </form>
        <hr />
        <Timer />
        <DiceRoller />
        <Players />
        <Ready />
      </Container>
    );
  }
}

CategoriesList.propTypes = {

};

const mapStateToProps = state => ({
  gameReducerInstance: state.gameReducerInstance,
  gameAnswers: state.gameReducerInstance.gameAnswers,
  currentRound: state.gameReducerInstance.currentRound
});

export default connect(
  mapStateToProps,
  { getItems }
)(CategoriesList);
