// class component
// function component
import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "tuan anh anh",
    address: "bac ninh",
    age: 20,
  };
  handleClick(e) {
    console.log(e.target);
    console.log("My name is: ", this.state.name);
  }

  handleOnMouseOver(e) {
    console.log(e.pageX);
  }
  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and im from {this.state.address}
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
export default MyComponent;
