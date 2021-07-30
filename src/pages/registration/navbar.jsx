import React from "react";
import Login_form from "./login_form";
import MassageItem from "./MassageItem";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.changeVision = this.changeVision.bind(this);
  }

  deleteMassage = () =>{
    let count2 = this.state.count;
    count2 = count2-1;
    this.setState({count:count2})
  }
  changeVision() {
    if (this.state.count !== 0) {
      let block = document.getElementById("vuizd");
      if (block.style.display === "none") {
        block.style.display = "block";
      } else {
        block.style.display = "none";
      }
    }
  }
  componentDidMount() {
    let x = this;
    let data = JSON.stringify({
      nickname: cookies.get("nickname"),
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/notif/get", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let data = JSON.parse(request.response);
      let map = new Map();
      data.forEach((element) => {
        map.set(<MassageItem delete={x.deleteMassage} message={element.message} message_id={element.message_id} date={element.date}/>);
      });
      x.setState({ count: data.length, messageElement: map });
    });
    request.send(data);
  }

  render() {
    let bttn = null;
    let form = null;
    if (cookies.get("nickname")) {
      bttn = (
        <button
          onClick={this.changeVision}
          type="button"
          class="btn btn-primary"
          style={{ margin: "2px", position: "absolute", left: "80%" }}
        >
          Notifications
          <span style={{ color: "black" }} class="badge badge-light">
            {this.state.count}
          </span>
        </button>
      );
    }
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Forum
        </a>
        {bttn}
        <div id="vuizd" style={{ display: "none" }}>
          {this.state.messageElement}
        </div>
        <Login_form />
      </nav>
    );
  }
}

export default Navbar;
