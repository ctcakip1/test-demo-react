import React from "react";

class UserInfo extends React.Component {
  state = {
    name: "tuan anh anh",
    address: "bac ninh",
    age: 20,
  };

  handleOnChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleOnChangeAge = (e) => {
    this.setState({
      age: e.target.value,
    });
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and im from {this.state.age}
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <label>Your Name:</label>
          <input
            type="text"
            value={this.state.name}
            onChange={(e) => this.handleOnChange(e)}
          />
          <label>Your Age:</label>
          <input
            type="text"
            value={this.state.age}
            onChange={(e) => this.handleOnChangeAge(e)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserInfo;
