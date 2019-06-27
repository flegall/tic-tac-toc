import ReactDOM from "react-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <h1>Hello React</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
