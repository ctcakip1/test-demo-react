import React, { useState } from "react";

// class AddUserInfo extends React.Component {
//   state = {
//     name: "tuan anh anh",
//     address: "bac ninh",
//     age: 20,
//   };

//   handleOnChange = (e) => {
//     this.setState({
//       name: e.target.value,
//     });
//   };
//   handleOnChangeAge = (e) => {
//     this.setState({
//       age: e.target.value,
//     });
//   };
//   handleOnSubmit = (e) => {
//     e.preventDefault();
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   render() {
//     return (
//       <div>
//         My name is {this.state.name} and im from {this.state.age}
//         <form onSubmit={(e) => this.handleOnSubmit(e)}>
//           <label>Your Name:</label>
//           <input
//             type="text"
//             value={this.state.name}
//             onChange={(e) => this.handleOnChange(e)}
//           />
//           <label>Your Age:</label>
//           <input
//             type="text"
//             value={this.state.age}
//             onChange={(e) => this.handleOnChangeAge(e)}
//           />
//           <button>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

const AddUserInfo = (props) => {
  const [userDefault, setUserDefault] = useState({
    name: "",
    address: "bac ninh",
    age: "",
  });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("bac ninh");
  const [age, setAge] = useState("");
  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeAge = (e) => {
    setAge(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };
  return (
    <div>
      My name is {name} and im from {age}
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <label>Your Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleOnChange(e)}
        />
        <label>Your Age:</label>
        <input
          type="text"
          value={age}
          onChange={(e) => handleOnChangeAge(e)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUserInfo;
