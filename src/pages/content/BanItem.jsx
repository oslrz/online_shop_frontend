import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class BanItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleHover = this.handleHover.bind(this);
    this.handleOut = this.handleOut.bind(this);
    this.handleBan = this.handleBan.bind(this);
  }

  handleHover() {
    let element = document.getElementById(this.props.data.id);
    element.style.color = "red";
  }

  handleOut() {
    let element = document.getElementById(this.props.data.id);
    element.style.color = "black";
  }

  handleBan() {
    let x = this;
    let data = JSON.stringify({
      id: this.props.data.id,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/account/ban", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let element = document.getElementById(x.props.data.id);
      element.style.color = "red";
    });
    request.send(data);
  }

  render() {
    let value = this.props.data;
    if (value.admin === null) {
      value.admin = "false";
    }
    return (
      <tr
        id={value.id}
        onMouseOver={this.handleHover}
        onMouseOut={this.handleOut}
        onClick={this.handleBan}
      >
        <th scope="row">{value.id}</th>
        <th>{value.nickname}</th>
        <th>{value.password}</th>
        <th>{value.email}</th>
        <th>{value.admin}</th>
        <th>{String(value.ban)}</th>
      </tr>
    );
  }
}

export default BanItem;
