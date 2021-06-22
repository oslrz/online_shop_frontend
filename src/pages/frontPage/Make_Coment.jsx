import React from "react";
import Cookies from "universal-cookie";


const cookies = new Cookies();


class Make_Coment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { state: false,data:""};
    this.handleChange = this.handleChange.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.makeCom = this.makeCom.bind(this);
  }
  makeCom() {
    this.setState({ state: !this.state.state });
    let doc = document.getElementById("make_com_div");
    let bttn = document.getElementById("bttn_hidn");
    let style = doc.style.display;
    if (style === "none") {
      bttn.style.display = "block";
      doc.style.display = "block";
    } else {
      bttn.style.display = "none";
      doc.style.display = "none";
    }
  }

  changeHeight() {
    let txt = document.getElementById("textarea");
    txt.style.height = txt.scrollHeight + "px";
  }
  handleChange(event) {
    this.setState({ data: event.target.value });
  }
  handleClick() {
    let x = this.props;
    let data = JSON.stringify({
        id:this.props.id,
        text:this.state.data,
        author:cookies.get('nickname')
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/comments/make_comment", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        if(request.response !== 'good'){
            alert(request.response)
        }
    });
    request.send(data);
  }

  render() {
    let text;
    if (!this.state.state) {
      text = "make comment";
    } else {
      text = "Close";
    }
    return (
      <div>
        <button type="button" class="btn btn-primary" onClick={this.makeCom}>
          {text}
        </button>
        <div id="make_com_div" style={{ display: "none" }}>
          <textarea
            id="textarea"
            onInput={this.changeHeight}
            onChange={this.handleChange}
          ></textarea>
          <button
            style={{ display: "none" }}
            id="bttn_hidn"
            type="button"
            className="btn btn-success"
            style={{ float: "inline-end" }}
            onClick={this.handleClick}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Make_Coment;
