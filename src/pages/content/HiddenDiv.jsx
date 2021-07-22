import React from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class HiddenDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.status, text:null};
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose(){
    this.setState({status:false})
  }
  componentDidMount() {
    if (this.props.status) {
      let element = document.getElementById("hidden_div");
      element.style.display = "block";
    }
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
  }
  handleSend() {
    let data = JSON.stringify({
      nickname: cookies.get("nickname"),
      data:this.state.text
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/theme/add", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        // Сповіщення
    });
    request.send(data);
  }
  render() {
    if (this.props.status) {
      return (
        <div id="hidden_div">
          <h1 style={{float:'inline-start'}}>Додати тему</h1>
          <i className="icofont-close" style={{position:'relative',marginLeft:'2rem'}} onClick={this.props.closeDiv}></i>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              тема
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onInput={this.handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSend}
          >
            Додати
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default HiddenDiv;
