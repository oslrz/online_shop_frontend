import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: null };
    this.makeReply = this.makeReply.bind(this);
    this.handleText = this.handleText.bind(this);
  }
  handleText(event) {
    this.setState({ text: event.target.value });
  }
  makeReply() {
    if (this.state.text !== null || this.state.text !== "") {
      let data = JSON.stringify({
          post_code:this.props.id,
        id: this.props.code,
        author: cookies.get("nickname"),
        text: this.state.text,
      });
      let request = new XMLHttpRequest();
      request.open("POST", "http://localhost:9000/comments/reply", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.addEventListener("load", function () {
        document.location.reload()
      });
      request.send(data);
    }
  }
  render() {
    if (this.props.vision) {
      return (
        <div className="makecomdiv">
          <input
            onChange={this.handleText}
            style={{ float: "left", width: "inherit" }}
            type="text"
          />
          <input style={{ float: "left", marginTop:"0.2rem" }} type="file" />
          <button
            onClick={this.makeReply.bind(this)}
            style={{ float: "inline-end", marginTop:"0.2rem" }}
            type="button"
            className="btn btn-primary"
          >
            Відповісти
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}
export default Response;
