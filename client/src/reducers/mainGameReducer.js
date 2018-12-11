import { GET_ITEMS, GET_PLAYERS, GET_PLAYER_RESPONSES, SEND_PLAYER_EMAILS, START_GAME, UPDATE_LETTER, TIMES_UP } from "../actions/types";
var category1 = {
  items: [
    {
      name: "Things Found on a Map"
    },
    {

      name: "School Supplies"
    },
    {
      name: "Reason to Make a Call"
    },
    {
      name: "Things With Wheels"
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
var max = msgGories.length;

const initialState = {
  currentCategories: [],
  playersHash: {},
  hostPlayer: "agdel.m.irlanda@gmail.com",
  players: [],
  action: "",
  gameStarted: false,
  msgGories: msgGories,
  letter: null,
  currentRound: 0,
  maxRounds: 3,
  gameOver: false,
  gameSessionID: null,
  gameAnswers: [],
  timesUp:true

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:

      //  var random = Math.floor(Math.random() * (+max - +min)) + +min;  
      //   var currentMsgGoriesItems = msgGories[random].items;
      //   msgGories.splice(random, 1);
      return {
        ...state,
        currentCategories: [],
        action: action.type
      };
    case GET_PLAYERS:
      var tempPlayersHash = {};
      for (var i = 0; i < action.payload.length; i++) {
        tempPlayersHash[action.payload[i].email] = action.payload[i];
      }
      return {
        ...state,
        players: action.payload,
        action: action.type,
        playersHash: tempPlayersHash
      };

    case UPDATE_LETTER:
      return {
        ...state,
        letter: action.payload,
        action: action.type
      };
    case START_GAME:
      //var random = Math.floor(Math.random() * (+max - +min)) + +min;  
      // var categoriesArrayCopy = state.msgGories[0].items.slice(0);
      var thisRoundCategories = state.msgGories.shift()

      // msgGories.splice(random, 1);
      return {
        ...state,
        action: action.type,
        gameStarted: true,
        currentCategories: thisRoundCategories.items,
        timesUp:false,
        currentRound: action.payload.currentRound,
        gameSessionID: action.payload.gameSessionID


      };

    case TIMES_UP:
      console.log(state.gameAnswers)
      var tempPlayersHash = {};
      for (var i = 0; i < action.payload.length; i++) {
        tempPlayersHash[action.payload[i].email] = action.payload[i].responses;
      }
console.log(tempPlayersHash);
      return {
        ...state,
        timesUp:true,
        playerHash: tempPlayersHash
      }
    case GET_PLAYER_RESPONSES:
      return {
        ...state
      };

    default:
      return state;
  }
}
