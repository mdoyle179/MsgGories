import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_PLAYERS } from "../actions/types";

export const getItems = () => {
  return {
    type: GET_ITEMS
  };
};

export const getPlayers = () => {
  return {
    type: GET_PLAYERS
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
