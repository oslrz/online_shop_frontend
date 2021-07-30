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


      let notif_data = JSON.stringify({
        author:this.props.author, //автор поста
        replyer:cookies.get('nickname'),  //автор відповіді
        post_code:this.props.id,  // код поста
        text: this.state.text  //текст відповіді
      })
      let request1 = new XMLHttpRequest();
      request1.open("POST", "http://localhost:9000/notif/make", true);
      request1.setRequestHeader("Content-Type", "application/json");
      request1.addEventListener("load", function () {
        
      });
      request1.send(notif_data);
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
