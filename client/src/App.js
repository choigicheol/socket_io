import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Join from "./components/Join";
import "./App.css";
function App() {
  return (
    <main id="mainContainer">
      <Router>
        <Route exact path="/" component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
    </main>
  );
}

export default App;
