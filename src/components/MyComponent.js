// class component
// function component
import React from "react";
import { applyMiddleware } from "redux";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "tuan anh", age: 10 },
      { id: 2, name: "tuan", age: 20 },
      { id: 3, name: "anh", age: 30 },
    ],
  };
  handleAddNewUser = (userObj) => {
    this.setState({
      listUsers: [userObj, ...this.state.listUsers]
    })
  };
  // JSX
  render() {
    // DRY: don't repeat yourself
    return (
      <div>
        <AddUserInfo 
        handleAddNewUser={this.handleAddNewUser}
        />
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
