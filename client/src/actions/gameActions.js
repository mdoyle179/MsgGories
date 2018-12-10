import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_PLAYERS,
   SEND_PLAYER_EMAILS, GET_PLAYER_RESPONSES, START_GAME, UPDATE_LETTER, NEXT_ROUND, TIMES_UP, UPDATE_PLAYER} from "./types";

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

export const timesUp = (gameData) => dispatch => {
    console.log("Times up action: " + gameData)    
    axios.get("./api/game/getMessages", gameData).then(res =>
        dispatch({
            type: TIMES_UP,
            payload: res.data
        })
    );
    
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


export const startGame =  gameData => dispatch  => {

  axios.post('/api/game/sendPlayerMessages', gameData);
   dispatch({
     type: START_GAME,
     payload: gameData
   });
  
};


