import React, { Component } from "react";
import { Container} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPlayers} from "../actions/gameActions";

class Players extends Component {
  constructor(props) {
    super(props);

  }

    componentDidMount(){
      this.props.getPlayers();
    }
    
      render() {
        const { players } = this.props.gameReducerInstance;
        return (

          <Container id="playerList" >
           
              <TransitionGroup>
                <div style={{textAlign:"center", fontSize:"small"}}>Players</div>
                {players.map(({ id, name, score }) => (
                  <CSSTransition key={id} timeout={500} classNames="fade">
                    <div>
                    <button onClick={this.resetTimer}>{name}<span style={{marginLeft:"10px"}}>{score}</span></button> 

                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>

          </Container>

        );
      }

}


Players.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    gameReducerInstance: state.gameReducerInstance
  });
  
  export default connect(
    mapStateToProps,
    { getPlayers }
  )(Players);
  