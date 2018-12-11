import React, { Component } from "react";
import { Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPlayers, scoreAnswers } from "../actions/gameActions";

class Players extends Component {
  constructor(props) {
    super(props);

  }

  clickHandler = (event) => {
    console.log(event.target.id + " " + event.target.value);
    this.props.scoreAnswers(event.target.id);
  }

  renderButton = (name, score, playerEmail) => {
    const { playersHash } = this.props.gameReducerInstance;

    if (playersHash[playerEmail]) {
      return (<button id={playerEmail} onClick={this.clickHandler} style={{ color: "lime", marginBottom: "2px" }} > {name} < span style={{ marginLeft: "10px" }}>{score}</span></button >);
    }
    else {
      return (<button disabled style={{ color: "gray" }}>{name}<span style={{ marginLeft: "10px" }}>{score}</span></button>)
    }
  }
  componentDidMount() {
    this.props.getPlayers();
  }


  render() {
    const { players } = this.props.gameReducerInstance;
    var playerIndex = 0;
    return (

      <Container id="playerList" >

        <TransitionGroup>
          <div style={{ textAlign: "center", fontSize: "small" }}>Players</div>
          {players.map(({ name, score, email }) => (
            <CSSTransition timeout={500} classNames="fade">
              <div>
                {this.renderButton(name, score, email)}

              </div>

            </CSSTransition>

          ))}
        </TransitionGroup>

      </Container>

    );
  }

}



const mapStateToProps = state => ({
  gameReducerInstance: state.gameReducerInstance
});

export default connect(
  mapStateToProps,
  { getPlayers, scoreAnswers }
)(Players);
