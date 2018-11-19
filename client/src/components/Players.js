import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPlayers} from "../actions/itemActions";

class Players extends Component {
    componentDidMount() {
      this.props.getPlayers();
      const { players } = this.props.itemsReducerInstance;
      for (var i =0; i < players.length; i++)
      {
        console.log(players[i]);
      }
      }
    
    
      render() {
        const { players } = this.props.itemsReducerInstance;
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
    itemsReducerInstance: state.itemsReducerInstance
  });
  
  export default connect(
    mapStateToProps,
    { getPlayers }
  )(Players);
  