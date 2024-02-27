// class component
// function component
import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "tuan anh anh",
    address: "bac ninh",
    age: 20,
  };
  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and im from {this.state.address}
      </div>
    );
  }
}
export default MyComponent;
