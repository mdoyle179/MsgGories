import { connect } from "react-redux";
import { startGame, timesUp } from "../actions/gameActions";
import  React from "react";
import  ms from "pretty-ms";
const uuid = require("uuid");


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      start: 0,
      isOn: false
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    // const {players} = this.props.gameReducerInstance;
    // const {msgGories} = this.props.gameReducerInstance;
    // const {currentRound} = this.props.gameReducerInstance;
    
    // var thisRound = currentRound + 1;
  
    var self=this;
    // var gameSessionID = uuid();


    // const gameData = {
    //   gameSessionID: gameSessionID,
    //   currentRound: 1,
    //   players: players,
    //   categories: msgGories[thisRound -1]
    // }


    this.props.startGame();
    setTimeout(function(){
      self.setState({
      time: self.state.time,
      start: Date.now() - self.state.time,
      isOn: true
    });
    self.timer = setInterval(
      () =>
      self.setState({
          time: Date.now() - self.state.start
        }),
      1
    );
      }, 5000);
  }

  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState({ time: 0 });
  }

  renderTimer() {
    if (this.state.time < 1000) return 0;

    if (this.state.time >= 30000){
      this.stopTimer();
      this.resetTimer();
      this.props.timesUp();
      return 0;
    }


    return ms(this.state.time,  {secDecimalDigits:0});
  }

  render() {
    let start =
      this.state.time === 0 ? (
        <button onClick={this.startTimer}>Start Game!</button>
      ) : null;

    let stop = this.state.isOn ? (
      <button onClick={this.stopTimer}>Stop</button>
    ) : null;

    let reset =
      this.state.time !== 0 && !this.state.isOn ? (
        <button onClick={this.resetTimer}>Reset</button>
      ) : null;

    let resume =
      this.state.time !== 0 && !this.state.isOn ? (
        <button onClick={this.startTimer}>Resume</button>
      ) : null;

    return (
      <div id="timer">
        <h4>timer: {this.renderTimer()}</h4>
        {start}
        {resume}
        {stop}
        {reset}
        {/* <button>GetPlayers</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameReducerInstance: state.gameReducerInstance
});

export default connect(
  mapStateToProps,
  { startGame, timesUp }
)(Timer);

