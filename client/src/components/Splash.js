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

class Splash extends Component {
  state = {
    modal: false,
    name: "",
    letter: ""
  };

  componentDidMount() {
    this.toggle();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };


  render() {
    return (
      <div id="splash">

        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 1 }} backdropTransition={{ timeout: 1 }} >
          <ModalBody>
          <TransitionGroup>
          <CSSTransition id="splashTransition" timeout={4000} classNames="fade">
            <div style={{ textAlign: "center", margin: "10px" }}>
              <img src={logo} alt="Grog!"/>
            </div>
            </CSSTransition>
            <h2 style={{ textAlign: "center" }}>Presents</h2>
            <div id="logoSplash">MsgGories</div>
            <div style={{ textAlign: "center" }}>In collaboration with</div>
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "red", fontSize: "20pt" }}>
                K-BRYTE STUDIOS
              </span>{" "}
              AND{" "}
              <span style={{ color: "lime", fontSize: "20pt" }}>
                MAD HACKERS INC
              </span>
              <p/>
              <button onClick={this.toggle}>Play Game!</button>
            </div>
            <div style={{color:"orange", fontSize:"8pt", textAlign:"center", marginTop: "25px"}}>1984 Agtivision,  Inc</div>

            </TransitionGroup>
          </ModalBody>
        </Modal>
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
)(Splash);
