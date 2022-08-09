// import { Layout } from 'antd';
// import React from 'react';
// import { render } from 'react-dom';
// import Header from "./view/Herder"
// // import Content from "./view/Content"
// import Sider from "./view/Sider"

// class App extends  (
//   render(){
//     return (
//       <div>

//       </div>
//     )
//   }

 
// );

// export default App;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Admin from "./view/Admin"

export default class App extends Component {
  render() {
    return (
      <div style={{
        margin:0,
        padding:0,
       }}>
        <Admin></Admin>
      </div>
    );
  }
}
// import React from 'react'
// import Admin from "./view/Admin"

//  function App(props) {
//   return (
//     <div style={{
//       margin:0,
//       padding:0,
//      }}>
//       {/* <Admin></Admin> */}
//       {props.children}
//     </div>
//   )
// }
// export default App;

