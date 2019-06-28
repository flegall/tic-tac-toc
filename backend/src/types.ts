type Square = null | string;

type Game = {
  player1: string; // Le rond
  player2: string; // La croix
  board: Array<Array<Square>>;
};

export type GameState =
  | {
      status: "WAITING_FOR_PLAYERS";
      lastGameResult?: Game & { winner: string | null };
    }
  | { status: "WAITING_FOR_OPPONENT"; player1: string }
  | ({
      status: "ONGOING";
      playerTurn: string;
    } & Game);

/**
  POST /api/reset : réinitialiser : Bascule en WAITING_FOR_PLAYERS (sans lastGameResult);
  POST /api/startGame : {playerId: string} : appelé par les deux joueurs : Bascule en  WAITING_FOR_OPPONENT ou ONGOING
  POST /api/play : {playerId: string, position: [number, number] } : 
      Joue le pion, Reste en ONGOING, Sinon Bascule en WAITING_FOR_PLAYERS avec un lastGameResult
 */
