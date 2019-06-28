let state = {
  status: "WAITING_FOR_PLAYERS"
};

export const getState = () => state;

const updateState = newState => {
  state = {
    ...state,
    ...newState
  };
};

const checkMoveAllowed = (row, col) => {
  const { board } = getState();
  return !board[row][col];
};

const checkLine = (playerId, row) => {
  const { board } = getState();

  return !board[row].filter(col => col !== playerId).length;
};

const checkColumn = (playerId, col) => {
  const { board } = getState();

  const colArray = board.map(row => row[col]);

  return !colArray.filter(colId => colId !== playerId).length;
};

const checkDiagonal = playerId => {
  const { board } = getState();

  const leftToRight = [[0, 0], [1, 1], [2, 2]];
  const rightToLeft = [[0, 2], [1, 1], [2, 0]];

  return (
    !leftToRight.filter(([row, col]) => board[row][col] !== playerId).length ||
    !rightToLeft.filter(([row, col]) => board[row][col] !== playerId).length
  );
};

const checkNullMatch = () => {
  const { board } = getState();

  return !board.filter(row => !!row.filter(col => col === null).length).length;
};

export const play = ({ playerId, position: [row, col] }) => {
  // check move allow
  if (!checkMoveAllowed(row, col)) {
    updateState({
      error: {
        playerId,
        message: "CANNOT_PLAY_HERE"
      }
    });
    return;
  }

  // update board if allow
  const { board, player1, player2 } = getState();
  board[row][col] = playerId;

  // check winner
  if (
    checkLine(playerId, row) ||
    checkColumn(playerId, col) ||
    checkDiagonal(playerId)
  ) {
    state = {
      status: "WAITING_FOR_PLAYERS",
      lastGameResult: {
        player1,
        player2,
        board,
        winner: playerId
      }
    };
    return;
  } else if (checkNullMatch()) {
    state = {
      status: "WAITING_FOR_PLAYERS",
      lastGameResult: {
        player1,
        player2,
        board,
        winner: null
      }
    };
    return;
  }

  const playerTurn = playerId === player1 ? player1 : player2;
  updateState({
    playerTurn,
    board
  });
};

export const startGame = ({ playerId }) => {
  switch (state.status) {
    case "WAITING_FOR_PLAYERS":
      state = {
        status: "WAITING_FOR_OPPONENT",
        player1: playerId
      };
      break;
    case "WAITING_FOR_OPPONENT": {
      if (playerId === state.player1) {
        break;
      }
      state = {
        ...state,
        status: "ONGOING",
        player2: playerId,
        playerTurn: playerId,
        board: [[null, null, null], [null, null, null], [null, null, null]]
      };
      break;
    }
  }
};

export const resetState = () => {
  state = {
    status: "WAITING_FOR_PLAYERS"
  };
};
