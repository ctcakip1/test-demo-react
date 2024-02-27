// class component
// function component
import React from "react";
import { applyMiddleware } from "redux";
class MyComponent extends React.Component {
  state = {
    name: "tuan anh anh",
    address: "bac ninh",
    age: 20,
  };
  handleClick(e) {
    console.log("click me button");
    // merge State  -> react class
    this.setState({
      name: "tuan em",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }

  handleOnMouseOver(e) {
    // console.log(e.pageX);
  }
  handleOnChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and im from {this.state.age}
        <button
          onClick={(e) => {
            this.handleClick(e);
          }}
        >
          Click me
        </button>
        <form onSubmit={(e)=>this.handleOnSubmit(e)}>
          <input type="text" onChange={(e) => this.handleOnChange(e)} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
export default MyComponent;
