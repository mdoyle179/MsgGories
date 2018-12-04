import { GET_ITEMS, GET_PLAYERS, GET_PLAYER_RESPONSES, SEND_PLAYER_EMAILS, START_GAME } from "../actions/types";
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
  items: [
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
  items: [
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

const initialState = {
  items: msgGories[random].items,
  players: [],
  action: "",
  gameStarted: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        players: action.payload,
        action: action.type
      };
    case GET_PLAYERS:
      return {
        ...state,
        players: action.payload,
        action: action.type
      };
      case START_GAME:
      return {
        ...state,
        action: action.type,
        gameStarted: true
      };
    case GET_PLAYER_RESPONSES:
      return {
        ...state
      };

    default:
      return state;
  }
}
