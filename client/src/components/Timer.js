import { connect } from "react-redux";
import { startGame } from "../actions/itemActions";
import  React from "react";
import  ms from "pretty-ms";


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
    this.props.startGame();
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    });
    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start
        }),
      1
    );
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
  item: state.item
});

export default connect(
  mapStateToProps,
  { startGame }
)(Timer);

