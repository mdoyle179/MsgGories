import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem , getItems} from "../actions/itemActions";

class Players extends Component {
    componentDidMount() {
        this.props.getItems();
      }
    
    
      render() {
        const { players } = this.props.itemsReducerInstance;
        return (
          <section id="game">
          <Container id="playerList">
            <ListGroup>
            <ListGroupItem className="overallLook">

                Player | Score
                </ListGroupItem>
              <TransitionGroup>
                {players.map(({ id, name, score }) => (
                  <CSSTransition key={id} timeout={500} classNames="fade">
                    <ListGroupItem className="overallLook">

                      {name} {score}
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          </Container>
          </section>
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
    { getItems }
  )(Players);
  