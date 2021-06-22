import React from "react";
import FrontPage from "./frontPage/FrontPage"



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <FrontPage/>
    );
  }
}

export default App;
