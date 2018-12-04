import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLetter } from "../actions/itemActions";

class DiceRoller extends Component {


  componentDidMount = (event) =>{
    const { letter } = this.props.itemsReducerInstance;

    if (letter === null) this.generateLetter();

  }

  generateLetter = () => {
    var min = 64;
    var max = 90;
    var random;

    var letterIsGood = false;

    while (!letterIsGood) {
      random = Math.floor(Math.random() * (+max - +min)) + +min;
      console.log(random);
      if (random > 64 && random < 85 && random !== 81) {
        letterIsGood = true;
      }
    }
    var letter = String.fromCharCode(random);
    this.props.updateLetter(letter);
  };



  render() {
 
    const {gameStarted} = this.props.itemsReducerInstance;
    if (!gameStarted) return null;

    const { letter } = this.props.itemsReducerInstance;

    if (letter === null) this.generateLetter();
  
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
  itemsReducerInstance: state.itemsReducerInstance
});

export default connect(
  mapStateToProps,
  { updateLetter }
)(DiceRoller);
