import React, { Component } from "react";
import uuid from "uuid";
import logo from "../img/AgtivisionCropped.png";
import {
  Modal,
  ModalBody

} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { startGame } from "../actions/gameActions";

class Ready extends Component {
  state = {
    modal: false,
    name: "",
    letter: "",
    toggledOnce: false,
    seconds: 5,
    countDown: false
  };

  startCountdown() {

    if (seconds == "GO!") return;
    var seconds = this.state.seconds;
    var countDown = true
    this.timer = setInterval(() => {
      seconds--;
      if (seconds == 0) {
        seconds = "GO!"
        clearInterval(this.timer);
        //this.props.startGame();
        countDown = false;
        this.toggle();
      };
      this.setState({
        seconds: seconds,
        countDown: countDown

      })
    }, 1000);

  }

  componentDidMount() {
    // this.toggle();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      toggledOnce: true
    });
  };


  render() {

    const { gameStarted } = this.props.gameReducerInstance;
    if (!gameStarted) return null;

    if (gameStarted && !this.state.toggledOnce) this.toggle();

    if (this.state.countDown == false) this.startCountdown();
    const { players } = this.props.gameReducerInstance;

    return (
      <div id="splash">

        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 1 }} backdropTransition={{ timeout: 1 }} >
          <ModalBody>


            <div id="logoSplash">MsgGories</div>
            <h2>Ready! in : {this.state.seconds}</h2>
            <TransitionGroup>
              <div className="ready">
                <div style={{ textAlign: "center" }}>Players
                <table style={{ margin: "3em auto", padding: "5px" }}>
                    {players.map(({ id, name, score }) => (
                      <CSSTransition key={id} timeout={500} classNames="fade">
                        <tr>

                          <td style={{ textAlign: "left", width: "200px", padding: "5px" }}>{name}</td>
                          <td style={{ textAlign: "center", width: "200px", padding: "5px" }}>{score}</td>


                        </tr>
                      </CSSTransition>
                    ))}
                  </table>
                </div>
              </div>
            </TransitionGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameReducerInstance: state.gameReducerInstance
});
export default connect(
  mapStateToProps,
  { startGame }
)(Ready);
