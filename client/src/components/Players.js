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

  renderButton = (name, score,  playerEmail) => {
    const {playersHash} = this.props.gameReducerInstance;
    var buttonTextStyle ={
      color:"gray"
    } 
    if (playersHash)
    {
      console.log(playersHash);
      if (playersHash[playerEmail]) buttonTextStyle.color = "lime";
    }

    return (<button onClick={this.resetTimer} style={buttonTextStyle}>{name}<span style={{marginLeft:"10px"}}>{score}</span></button>)
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
                {players.map(({ id, name, score, email }) => (
                  <CSSTransition key={id} timeout={500} classNames="fade">
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
  