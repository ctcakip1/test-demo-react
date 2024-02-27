// class component
// function component
import React from "react";
import { applyMiddleware } from "redux";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";
class MyComponent extends React.Component {
  // JSX
  render() {
    const myAge = 50;
    const myArr = ["a", "b", "c"];
    return (
      <div>
        <UserInfo />
        <br/><br/>
        <DisplayInfo name="tuan anh em" age="20" />
        <hr />
        <DisplayInfo name="em" age={myAge} myArr = {myArr} />
      </div>
    );
  }
}
export default MyComponent;
