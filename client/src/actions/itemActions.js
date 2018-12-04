<<<<<<< HEAD
import {
    GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_PLAYERS,
    SEND_PLAYER_EMAILS, GET_PLAYER_RESPONSES
} from "../actions/types";
=======
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_PLAYERS,
   SEND_PLAYER_EMAILS, GET_PLAYER_RESPONSES, START_GAME } from "../actions/types";
>>>>>>> Added ore game logic, beginning of the ready screen
import axios from "axios";



export const getItems = () => dispatch => {
    axios.get("./api/items").then(res =>
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    );
};

export const getPlayers = () => dispatch => {
    axios.get("./api/items/players").then(res =>
        dispatch({
            type: GET_PLAYERS,
            payload: res.data
        })
    );
};


export const getPlayerResponses = () => {
    return {
        type: GET_PLAYER_RESPONSES
    };
};

<<<<<<< HEAD
export const sendPLayerEmails = () => {
    return {
        type: SEND_PLAYER_EMAILS
    };
=======
export const sendPlayerEmails = () => {
  return {
    type: SEND_PLAYER_EMAILS
  };
>>>>>>> Added ore game logic, beginning of the ready screen
};

export const startGame = (playerEmails) => {

  return {
    type: START_GAME 
  };
};

export const deleteItem = id => {
    return {
        type: DELETE_ITEM,
        payload: id
    };
};

export const addItem = item => {
    return {
        type: ADD_ITEM,
        payload: item
    };
};
