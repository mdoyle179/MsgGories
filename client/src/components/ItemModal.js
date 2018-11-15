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

class ItemModal extends Component {
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
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.generateLetter}
        >
          Roll Die
        </Button>
        <div>{letter}</div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <label for="item">Item</label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }}>
                  Save
                </Button>
              </FormGroup>
            </Form>
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
)(ItemModal);
