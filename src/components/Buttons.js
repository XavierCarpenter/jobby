import React from 'react';
import "../styles/Buttons.css";

const Buttons = () => {
//    let  btn1Style = {
//         background: this.props.solid,
//     color: 'white',
//    }
console.log(this.props)
  return <div className="buttons">
      <button  className="btn btn1">
        Add
      </button>
      <button className="btn btn2">Edit</button>
    </div>;
};

export default Buttons;