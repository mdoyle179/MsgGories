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
  getItems, getPlayers, submitHostPlayerAnswers, updatePlayerScore
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
      answersObject: {},
      currentPlayer: "",
      currentScoringAnswerIndex: 0,
      playerScoreHash: {},
    };
    for (var i = 0; i < currentCategories.length; i++) {
      this.state.toolTips["inputX" + i] = false;
    }

    //this.initAnswersArray(currentCategories);
  }


  onScoreAnswer = e =>{
    const { nowScoringPlayer } = this.props.gameReducerInstance;
    const { playersHash } = this.props.gameReducerInstance;
    console.log(e.target.id + " " + e.target.value)
    var score = 0;
    if (nowScoringPlayer == "") return;

    playersHash[nowScoringPlayer][this.state.currentScoringAnswerIndex].points = e.target.id;

    if (this.state.currentScoringAnswerIndex === playersHash[nowScoringPlayer].length-1) 
    {
      for (var i = 0; i < playersHash[nowScoringPlayer].length; i++)
      {
        score = score +  parseInt(playersHash[nowScoringPlayer][i].points, 10);
      }
      console.log("Score is:"  + score)
      var tempScoreHash = this.state.playerScoreHash;
      tempScoreHash[nowScoringPlayer] = score;
      
      this.props.updatePlayerScore(tempScoreHash);
      this.setState({currentScoringAnswerIndex:0,
        score:0,
        playerScoreHash: tempScoreHash
        
      });
    }
    else{
      var index = this.state.currentScoringAnswerIndex;
      index++;
      this.setState({currentScoringAnswerIndex:index});
    }

    
  }

  onChange = e => {

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
    this.setState({
      toolTips: tooltipArray
    });
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.answersObject);
    this.props.submitHostPlayerAnswers(this.state.answersObject);

  }


  renderScoreButtons = () => {
    const { timesUp } = this.props.gameReducerInstance;
    if (timesUp) return (
      <div>Click to score MsgGory<button onClick={this.onScoreAnswer} id="0">0</button>
      <button onClick={this.onScoreAnswer} id="1">1</button>
      <button onClick={this.onScoreAnswer} id="2">2</button></div>
    )
    else return null;
  }

  renderSubmit = () => {
    const { gameStarted } = this.props.gameReducerInstance;
    const { timesUp } = this.props.gameReducerInstance;
    if (timesUp) return null;
    if (gameStarted) return (

      <div><button >Submit Answers</button></div>
    )
    else return null
  }



  renderCategoriesToScore = () => {
    const { timesUp } = this.props.gameReducerInstance;
    const { nowScoringPlayer } = this.props.gameReducerInstance;
    const { playersHash } = this.props.gameReducerInstance

    if ((!timesUp) || (nowScoringPlayer == "")) {
      return null;
    }
    else {

      var itemIndex = 0;
      var highLight = {};


      return (
        <div>
          {playersHash[nowScoringPlayer].map(({ id, question, answer }) => (
            <ListGroupItem>
              {/* <span style={{float:"left"}}>
              <button id={"button0" + itemIndex} style={{fontSize:"8pt"}}>0</button>
              <button  id={"button1" + itemIndex} style={{fontSize:"8pt"}}>1</button>
              <button id={"button2" + itemIndex} style={{fontSize:"8pt"}}>2</button></span> */}

              <input id={"nowScoringPlayer" + itemIndex} style={ itemIndex == this.state.currentScoringAnswerIndex ? {color:"lime"}: {borderColor:"lime"}} type="text" placeholder={question} autofocus value={answer}></input>
              <Tooltip id={"tooltipnowScoringPlayer" + itemIndex} className="toolTip" placement="right" isOpen={this.state.toolTips["nowScoringPlayer" + itemIndex]} target={"nowScoringPlayer" + itemIndex} toggle={this.toggle}>
                {question}
              </Tooltip>


              <div style={{ display: "none" }}>{itemIndex++}</div>
            </ListGroupItem>

          ))}
        </div>
      );


    }
  }


  renderStageData = () => {
    const { timesUp } = this.props.gameReducerInstance;

    if (timesUp) {
      return (this.renderCategoriesToScore())
    }
    else {
      return (
        this.renderCategories()

      )
    }
  }

  renderCategories = () => {
    const { currentCategories } = this.props.gameReducerInstance;
    const { gameStarted } = this.props.gameReducerInstance;

    if (!gameStarted) return null;

    var itemIndex = 0;
    var trkey;
    return (
      <div>
        {currentCategories.map(({ id, name }) => (
          <CSSTransition key={itemIndex} timeout={500} classNames="fade">
            <ListGroupItem>

              {this.renderCategoryItem(name, itemIndex)}


              <div style={{ display: "none" }}>{itemIndex++}</div>
            </ListGroupItem>
          </CSSTransition>
        ))}
      </div>
    );
  }



  renderCategoryItem = (name, itemIndex) => {
    const { action } = this.props.gameReducerInstance;
    const { gameStarted } = this.props.gameReducerInstance;
    const {timesUp} = this.props.gameReducerInstance;
    if (timesUp) return null;
      if ((gameStarted) && (!timesUp)) {
      return (
        <div>
          <input name={itemIndex} id={"inputX" + itemIndex} onBlur={this.onChange} type="text" placeholder={name} autofocus autocomplete="off"></input>
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



    return (
      <Container id="itemList">
        <div id="logoPic" />
        <div id="logo">MsgGories</div>
        <form onSubmit={this.onSubmit}>
          <div id="stage">

            <ListGroup>
              <TransitionGroup>
                {this.renderStageData()}
              </TransitionGroup>
            </ListGroup>

          </div>

          {this.renderSubmit()}
        </form>
        {this.renderScoreButtons()}
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
  { getItems, submitHostPlayerAnswers, updatePlayerScore }
)(CategoriesList);
