let state = {
  status: "WAITING_FOR_PLAYERS"
};

export const getState = () => state;

export const startGame = ({ playerId }) => {
  switch (state.status) {
    case "WAITING_FOR_PLAYERS":
      state = {
        status: "WAITING_FOR_OPPONENT",
        player1: playerId
      };
      break;
    case "WAITING_FOR_OPPONENT":
      state = {
        ...state,
        status: "ONGOING",
        player2: playerId,
        playerTurn: playerId,
        board: [[null, null, null], [null, null, null], [null, null, null]]
      };
      break;
  }
};

export const resetState = () => {
  state = {
    status: "WAITING_FOR_PLAYERS"
  };
};
