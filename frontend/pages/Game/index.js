import React, { Component } from "react";
import ReactDOM from "react-dom";
import { io, playerId } from "../..";

import "./style.scss";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      c1: this.p1,
      c2: this.p1,
      c3: this.p1,
      c4: this.p1,
      c5: null,
      c6: null,
      c7: this.p2,
      c8: null,
      c9: null
    };

    io.on("gameState", event => {
      console.log("=> event : ", event);

      console.log("=> event.playerTurn : ", event.playerTurn);
      console.log("=> playerId : ", playerId);
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
    console.log("=> number : ", number);
  }

  handleKeyEvent({ key }) {
    if (this.state[key]) {
      // TODO : Ajouter le socket de la position
    }

    console.log("=> key : ", key);
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
