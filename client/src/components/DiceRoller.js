import React, { Component } from "react";
import uuid from "uuid";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class DiceRoller extends Component {
  state = {
    letter: ""
  };


  generateLetter = () => {
    var min = 64;
    var max = 90;
    var random;

    var letterIsGood = false;

    while (!letterIsGood) {
      random = Math.floor(Math.random() * (+max - +min)) + +min;
      console.log(random);
      if (random > 64 && random < 85 && random != 81) {
        letterIsGood = true;
      }
    }
    var letter = String.fromCharCode(random);
    this.setState({ letter: letter });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { letter } = this.state;
    return (
      <div id="diceRoller">
        <div style={{ fontSize:"28pt", padding:"10px", textAlign:"center"}}>{letter}</div>
        <button
          onClick={this.generateLetter}
        >
          Roll Die
        </button>

       
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addItem }
)(DiceRoller);
