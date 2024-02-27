// class component
// function component
import React from "react";
import { applyMiddleware } from "redux";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "tuan anh", age: 10 },
      { id: 2, name: "tuan", age: 20 },
      { id: 3, name: "anh", age: 30 },
    ]
  };
  // JSX
  render() {
    // DRY: don't repeat yourself
    return (
      <div>
        <UserInfo />
        <br />
        <br />
        <DisplayInfo
          listUsers={this.state.listUsers}
        />
      </div>
    );
  }
}
export default MyComponent;
