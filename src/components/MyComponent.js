// class component
// function component
import React, { useState } from "react";
import { applyMiddleware } from "redux";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";
// class MyComponent extends React.Component {
//   state = {
//     listUsers: [
//       { id: 1, name: "tuan anh", age: 10 },
//       { id: 2, name: "tuan", age: 20 },
//       { id: 3, name: "anh", age: 30 },
//     ],
//   };
//   handleAddNewUser = (userObj) => {
//     this.setState({
//       listUsers: [userObj, ...this.state.listUsers],
//     });
//   };
//   handleDeleteUser = (userId) => {
//     let listUserClone = [...this.state.listUsers];
//     listUserClone = listUserClone.filter((item) => item.id !== userId);
//     this.setState({
//       listUsers: listUserClone,
//     });
//   };
//   // JSX
//   render() {
//     // DRY: don't repeat yourself
//     return (
//       <>
//         <div>
//           <div className="a">
//             <AddUserInfo handleAddNewUser={this.handleAddNewUser} />
//             <br />
//             <br />
//             <DisplayInfo
//               listUsers={this.state.listUsers}
//               handleDeleteUser={this.handleDeleteUser}
//             />
//           </div>
//           <div className="b"></div>
//         </div>
//       </>
//     );
//   }
// }

const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: "tuan anh", age: "10" },
    { id: 2, name: "tuan", age: "20" },
    { id: 3, name: "anh", age: "30" },
  ]);

  const handleAddNewUser = (newObj) => {
    setListUsers([newObj, ...listUsers]);
  };
  const handleDeleteUser = (userId) => {
    let listUserClone = listUsers;
    listUserClone = listUserClone.filter((item) => item.id !== userId);
    setListUsers(listUserClone);
  };
  return (
    <>
      <div>
        <div className="a">
          <AddUserInfo handleAddNewUser={handleAddNewUser} />
          <br />
          <br />
          <DisplayInfo
            listUsers={listUsers}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
        <div className="b"></div>
      </div>
    </>
  );
};
export default MyComponent;
