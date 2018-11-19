import uuid from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, GET_PLAYERS, GET_PLAYER_RESPONSES, SEND_PLAYER_EMAILS} from "../actions/types";
var category1 = {
  items: [
    {
      name: "Things Found on a Map"
    },
    {

      name: "School Supplies"
    },
    {
      name: "Reasons to Make a Phone Call"
    },
    {
      name: "Things That Have Wheels"
    },
    {
      name: "Fictional Characters"
    },
    {
      name: "Reptiles/Amphibians"
    }
  ]
}

var category2 = {
  items:  [
    {
      name: "Menu Items"
    },
    {

      name: "Villains/Monsters"
    },
    {
      name: "Street Names"
    },
    {
      name: "Card Games"
    },
    {
      name: "Famous Duos and Trios"
    },
    {
      name: "Stones/Gems"
    }
  ]
}

var category3 = {
  items:  [
    {
      name: "Math Terms"
    },
    {

      name: "Things With Tails"
    },
    {
      name: "Things to Do on a Date"
    },
    {
      name: "Farm Animals"
    },
    {
      name: "A Boy's Name"
    },
    {
      name: "Items in a Suitcase"
    }
  ]
}
var msgGories = [];
msgGories.push(category1);
msgGories.push(category2);
msgGories.push(category3);
var min = 0;
var max = 3;
var random;
random = Math.floor(Math.random() * (+max - +min)) + +min;

var player1 = {
  name: "Ag",
  answer: "",
  score: 0
}

var player2 = {
  name: "Matt",
  answer: "",
  score: 0
}

var player3 = {
  name: "Kenna",
  answer: "",
  score: 0
}

// var players = [];
// players.push(player1);
// players.push(player2);
// players.push(player3);

const initialState = {
  items: msgGories[random].items,
  players: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        players: action.payload
      };
    case GET_PLAYERS:
      return {
        ...state,
        players: action.payload
      };

      case GET_PLAYER_RESPONSES:
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
