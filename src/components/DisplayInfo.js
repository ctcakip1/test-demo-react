import React, { useEffect, useState } from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";
import { applyMiddleware } from "redux";
//stateless and stateful
// class DisplayInfo extends React.Component {

//   render() {
//     // destructuring array/object
//     console.log("call me render");
//     const { listUsers } = this.props; // object
//     // console.log(listUsers);
//     // prop => viet tat cua properties
//     // console.table(listUsers);
//     return (
//       <div className="display-infor-container">
//         {/* <img src = {logo}/> */}
//         {true && (
//           <>
//             {listUsers.map((user, index) => {
//               return (
//                 <div key={user.id} className={user.age > 18 ? "green" : "red"}>
//                   <div>My name is {user.name}</div>
//                   <div>My age is {user.age}</div>
//                   <div>
//                     <button
//                       onClick={() => this.props.handleDeleteUser(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <hr />
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfo = (props) => {
  const { listUsers } = props; // object
  const [isShowHideListUser, setShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  };
  console.log("call me render");
  useEffect(() => {
    if (listUsers.length === 0) {
      alert("you delete all users");
    }
    console.log("call me useEffect");
  }, [listUsers]);
  return (
    <div className="display-infor-container">
      {/* <img src = {logo}/> */}
      <div>
        <span
          onClick={() => {
            handleShowHideListUser();
          }}
        >
          Show list user
          {isShowHideListUser === true ? "Hide" : "Show"}
        </span>
      </div>
      {isShowHideListUser && (
        <>
          {listUsers.map((user, index) => {
            return (
              <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                <div>My name is {user.name}</div>
                <div>My age is {user.age}</div>
                <div>
                  <button onClick={() => props.handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayInfo;
