import {
  GET_ITEMS, GET_PLAYERS, GET_PLAYER_RESPONSES, SEND_PLAYER_EMAILS, START_GAME, UPDATE_LETTER, TIMES_UP,
  SUBMIT_HOSTPLAYER_ANSWERS, SCORE_ANSWERS, UPDATE_PLAYER_SCORE
} from "../actions/types";
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

var player1SampleResponse = {
  playerEmail: "agdel_irlanda@comcast.net",
  responses: [
    {
      question: "Things Found on a Map",
      answer: "Pins"
    },
    {

      question: "School Supplies",
      answer: "Pencil"
    },
    {
      question: "Reason to Make a Call",
      answer: "Paternal pops"
    },
    {
      question: "Things With Wheels",
      answer: "Pod racers"
    },
    {
      question: "Fictional Characters",
      answer: "Poe Dameron"
    },
    {
      question: "Reptiles/Amphibians",
      answer: "Perodactile"
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
  hostPlayer: null,
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
  timesUp: false,
  nowScoringPlayer: "",
  debugMode: false

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
      var hostPlayer;
      for (var i = 0; i < action.payload.length; i++) {
        tempPlayersHash[action.payload[i].email] = null;
        if (action.payload[i].host)
        {
          hostPlayer = action.payload[i].email;
        }
      }
      return {
        ...state,
        players: action.payload,
        action: action.type,
        playersHash: tempPlayersHash,
        hostPlayer: hostPlayer
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
        timesUp: false,
        currentRound: action.payload.currentRound,
        gameSessionID: action.payload.gameSessionID


      };

    case TIMES_UP:
      console.log(action.payload)
      var tempPlayersHash = state.playersHash;
      if (!state.debugMode) {

          tempPlayersHash[action.payload.playerEmail] = action.payload.responses;

      }
      else {

        for (var i = 0; i < player1SampleResponse.responses.length; i++) {
          player1SampleResponse.responses[i]["points"] = null;
        }
        tempPlayersHash[player1SampleResponse.playerEmail] = player1SampleResponse.responses;
      }

     

      console.log(tempPlayersHash);
      return {
        ...state,
        timesUp: true,
        playersHash: tempPlayersHash
      }
    case GET_PLAYER_RESPONSES:
      return {
        ...state
      };
    case SUBMIT_HOSTPLAYER_ANSWERS:
      var tempHash = state.playersHash;
      var hostPlayerResponses = [];
      for (var i = 0; i < state.currentCategories.length; i++) {
        var formattedAnswersObject = {}
        formattedAnswersObject["question"] = state.currentCategories[i].name;
        formattedAnswersObject["answer"] = action.payload[i];
        formattedAnswersObject["points"] = null;
        hostPlayerResponses.push(formattedAnswersObject);

      }

      tempHash[state.hostPlayer] = hostPlayerResponses;
      return {
        ...state,
        playersHash: tempHash
      };
    case SCORE_ANSWERS:

      return {
        ...state,
        nowScoringPlayer: action.payload
      };

    case UPDATE_PLAYER_SCORE:
      var players = state.players;
      for (var i = 0; i < state.players.length; i++) {
        players[i].score = action.payload[players[i].email];
      }

      return {
        ...state,
        players: players
      };

    default:
      return state;
  }
}
