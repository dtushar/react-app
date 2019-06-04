import React, { Component } from "react";
import "./App.css";

import { Container } from "react-bootstrap";

import MyCard from "./container/MyCard";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container>
          <MyCard />
        </Container>
      </div>
    );
  }
}

export default App;
