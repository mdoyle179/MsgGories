import React, { Component } from "react";
import uuid from "uuid";
import logo from "../img/AgtivisionCropped.png";
import {
  Modal,
  ModalBody

} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
<<<<<<< HEAD
import { startGame } from "../actions/itemActions";
=======
import { addItem } from "../actions/itemActions";
>>>>>>> Not sure

class Ready extends Component {
  state = {
    modal: false,
    name: "",
    letter: "",
<<<<<<< HEAD
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
=======
    toggledOnce: false
  };

  componentDidMount() {
   // this.toggle();
>>>>>>> Not sure
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      toggledOnce: true
    });
  };


  render() {

<<<<<<< HEAD
    const { gameStarted } = this.props.itemsReducerInstance;
    if (!gameStarted) return null;

    if (gameStarted && !this.state.toggledOnce) this.toggle();

    if (this.state.countDown == false) this.startCountdown();
=======
    const {gameStarted} = this.props.itemsReducerInstance;
    if (!gameStarted) return null;
    
    if (gameStarted && !this.state.toggledOnce)  this.toggle();

>>>>>>> Not sure
    const { players } = this.props.itemsReducerInstance;

    return (
      <div id="splash">

        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 1 }} backdropTransition={{ timeout: 1 }} >
          <ModalBody>


            <div id="logoSplash">MsgGories</div>
<<<<<<< HEAD
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

            <button onClick={this.toggle}>Play Game!</button>

=======
            <h1>Ready! </h1>
            <TransitionGroup>
                <div className="ready">
                <div style={{textAlign:"center", fontSize:"small"}}>Players
                <table style={{margin:"1em auto", padding:"10px"}}>
                {players.map(({ id, name, score }) => (
                  <CSSTransition key={id} timeout={500} classNames="fade">
                  <tr>
                 
                  <td style={{textAlign:"left", width:"200px", padding:"10px"}}>{name}</td>
                  <td style={{textAlign:"center", width:"200px", padding:"10px"}}>{score}</td> 

                  
                    </tr>
                  </CSSTransition>
                ))}
                </table>
                </div>
                </div>
              </TransitionGroup>
             
 
              <hr />
              <button onClick={this.toggle}>Play Game!</button>
          
>>>>>>> Not sure

          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemsReducerInstance: state.itemsReducerInstance
});
export default connect(
  mapStateToProps,
<<<<<<< HEAD
  { startGame }
=======
  { addItem }
>>>>>>> Not sure
)(Ready);
