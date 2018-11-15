import uuid from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";
const initialState = {
  items: [
    {
      id: uuid(),
      name: "Things Found on a Map"
    },
    {
      id: uuid(),
      name: "School Supplies"
    },
    {
      id: uuid(),
      name: "Reasons to Make a Phone Call"
    },
    {
      id: uuid(),
      name: "Things That Have Wheels"
    },
    {
      id: uuid(),
      name: "Fictional Characters"
    },
    {
      id: uuid(),
      name: "Reptiles/Amphibians"
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    default:
      return state;
  }
}
