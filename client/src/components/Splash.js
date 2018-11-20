import React, { Component } from "react";
import uuid from "uuid";
import logo from "../img/AgtivisionCropped.png";
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

class Splash extends Component {
  state = {
    modal: false,
    name: "",
    letter: ""
  };

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
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Debug Splash
        </Button>
        <Modal isOpen={this.state.modal} className="custom">
          <ModalBody>
            <div style={{ textAlign: "center", margin: "10px" }}>
              <img src={logo} />
            </div>
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
            </div>
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
