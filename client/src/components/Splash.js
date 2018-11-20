import React, { Component } from "react";
import uuid from "uuid";
import logo from "../img/AgtivisionCropped.png";
import {
  Modal,
  ModalHeader,
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      id: uuid(),
      name: this.state.name
    };

    this.props.addItem(newItem);
  };

  render() {
    const { letter } = this.state;
    return (
      <div id="splash">
        {/* <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Debug Splash
        </Button> */}
        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 1 }} backdropTransition={{ timeout: 1 }} >
          <ModalBody>
          <TransitionGroup>
          <CSSTransition id="Aggie" timeout={4000} classNames="fade">
            <div style={{ textAlign: "center", margin: "10px" }}>
              <img src={logo} />
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
              <hr />
              <button onClick={this.toggle}>Play Game!</button>
            </div>

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
