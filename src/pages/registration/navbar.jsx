import React from "react";
import Login_form from "./login_form";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Forum
        </a>
        <Login_form />
      </nav>
    );
  }
}

export default Navbar;
