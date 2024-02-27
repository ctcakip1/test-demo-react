import React from "react";

class DisplayInfo extends React.Component{
    render() {
        console.log(this.props);
        // destructuring array/object
        const {age, name} = this.props; // object
        // prop => viet tat cua properties
        return (
            <div>
                <div>My name is {name}</div>
                <div>My age is {age}</div>
            </div>
        );
    }
}
export default DisplayInfo;