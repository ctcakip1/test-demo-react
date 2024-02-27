// class component
// function component
import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "tuan anh anh",
    address: "bac ninh",
    age: 20,
  };
  handleClick = (e) => {
    console.log(e.target);
    console.log("random", Math.floor(Math.random() * 100 + 1));
    // merge State  -> react class
    this.setState({
      name: "tuan em",
      age: Math.floor(Math.random() * 100 + 1)
    });
    
  };

  handleOnMouseOver(e) {
    // console.log(e.pageX);
  }
  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and im from {this.state.age}
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button
          onClick={(e) => {
            this.handleClick(e);
          }}
        >
          Click me
        </button>
      </div>
    );
  }
}
export default MyComponent;
