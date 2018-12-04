import React, { Component } from "react";
import uuid from "uuid";
import logo from "../img/AgtivisionCropped.png";
import {
  Modal,
  ModalBody

} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class Ready extends Component {
  state = {
    modal: false,
    name: "",
    letter: "",
    toggledOnce: false
  };

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

    const {gameStarted} = this.props.itemsReducerInstance;
    if (!gameStarted) return null;
    
    if (gameStarted && !this.state.toggledOnce)  this.toggle();

    const { players } = this.props.itemsReducerInstance;

    return (
      <div id="splash">

        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 1 }} backdropTransition={{ timeout: 1 }} >
          <ModalBody>


            <div id="logoSplash">MsgGories</div>
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
  { addItem }
)(Ready);
