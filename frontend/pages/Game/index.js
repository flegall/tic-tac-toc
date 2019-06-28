import React, { Component } from "react";
import ReactDOM from "react-dom";
import { io /*, playerId*/ } from "../..";

const playerId = "A";

import "./style.scss";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      c1: null,
      c2: null,
      c3: null,
      c4: null,
      c5: null,
      c6: null,
      c7: null,
      c8: null,
      c9: null,
      playerTurn: false
    };

    // const Eventboard = [
    //   ['A', null, null],
    //   [null, 'B', 'B'],
    //   [null, null, null]
    // ]

    io.on("gameState", event => {
      console.log("=> event : ", event);
      const signPlayer = event.player2 || "B" === playerId ? "X" : "O";
      const opponentSign = signPlayer === "X" ? "O" : "X";

      event.board.forEach((el, i) => {
        el.forEach((value, j) => {
          if (value) {
            this.setState({
              [`c${i * 3 + j + 1}`]:
                value === playerId ? signPlayer : opponentSign
            });
          }
        });
      });

      this.setState({
        playerTurn: event.playerTurn === playerId
      });
    });

    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }

  componentDidMount() {
    this.boardRef.style.width = this.boardRef.offsetHeight;
    this.boardRef.childNodes.forEach((el, i) => {
      el.style.height = this.boardRef.offsetHeight / 3;
    });

    document.addEventListener("keydown", this.handleKeyEvent);
    window.R7.grabKey("Numeric", this.handleKeyEventR7);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyEvent);
  }

  handleKeyEventR7({ number }) {
    if (number >= 1 && number <= 9) {
      io.emit("play", {
        playerId,
        position: [Number((number - 1) / 3), Number((number - 1) % 3)]
      });
    }
  }

  handleKeyEvent({ key }) {
    if (key >= 1 && key <= 9) {
      io.emit("play", {
        playerId,
        position: [Number((key - 1) / 3), Number((key - 1) % 3)]
      });
    }
  }

  render() {
    return (
      <div className="board" ref={el => (this.boardRef = el)}>
        <div className="row">
          <div id="c1">{this.state.c1}</div>
          <div id="c2">{this.state.c2}</div>
          <div id="c3">{this.state.c3}</div>
        </div>
        <div className="row">
          <div id="c4">{this.state.c4}</div>
          <div id="c5">{this.state.c5}</div>
          <div id="c6">{this.state.c6}</div>
        </div>
        <div className="row">
          <div id="c7">{this.state.c7}</div>
          <div id="c8">{this.state.c8}</div>
          <div id="c9">{this.state.c9}</div>
        </div>
      </div>
    );
  }
}

export default Game;
