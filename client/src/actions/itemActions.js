import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_PLAYERS,
   SEND_PLAYER_EMAILS, GET_PLAYER_RESPONSES, START_GAME, UPDATE_LETTER, NEXT_ROUND, TIMES_UP,UPDATE_PLAYER} from "../actions/types";


export const getPlayers = () => dispatch => {
    axios.get("./api/players/").then(res =>
        dispatch({
            type: GET_PLAYERS,
            payload: res.data
        })
    );
};
export const getItems = ()=> {
  return{
      type: GET_ITEMS,
      payload: GET_ITEMS
  }
}


export const updatePlayer = () => dispatch => {
    axios.put("./api/players").then(res =>
        dispatch({
            type: UPDATE_PLAYER,
            payload: res.data
        })
    );
};

export const getPlayerResponses = () => {
    return {
        type: GET_PLAYER_RESPONSES
    };
};

export const nextRound = () => {
  return {
    type: NEXT_ROUND
  };
};

export const updateLetter = (letter) => {
  return {
    payload: letter,
    type: UPDATE_LETTER
  };
};

export const timesUp = () => {
  return {
    type: TIMES_UP
  };
};

export const sendPlayerEmails = () => {
  return {
    type: TIMES_UP
  };
};

export const sendPLayerEmails = () => {
    return {
        type: SEND_PLAYER_EMAILS
    };

};

export const startGame = (playerEmails) => {

  return {
    type: START_GAME 
  };
};

export const deleteItem = id => {
  return {
    type: START_GAME 
  };
};

export const addItem = item => {
    return {
        type: ADD_ITEM,
        payload: item
    };
};
