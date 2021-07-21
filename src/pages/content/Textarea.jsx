import React from "react";
import Cookies from "universal-cookie";
import HiddenDiv from "./HiddenDiv";
const cookies = new Cookies();

class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: cookies.get("nickname"),
      data: "",
      topic: "",
      value: "",
      selectedFile: null,
      loaded: 0,
      fileName: "",
      status: false,
      map_data:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.handleTopic = this.handleTopic.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.addNewTheme = this.addNewTheme.bind(this);
  }
  closeDiv = () => {
    this.setState({ status: !this.state.status });
  };

  addNewTheme() {
    this.setState({ status: !this.state.status });
    this.forceUpdate();
  }
  componentDidMount() {
    let x = this;
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/theme/get", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let data = JSON.parse(request.response)
      let map = new Map();
      data.forEach(element => {
        map.set(<option value={element.theme}>{element.theme}</option>)
      });
      x.setState({map_data:map})
    });
    request.send();
  }

  onChangeHandler(event) {
    console.log("filedata", event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      fileName: event.target.files[0].name,
      loaded: 0,
    });
  }

  changeHeight() {
    let txt = document.getElementById("textarea");
    txt.style.height = txt.scrollHeight + "px";
  }
  handleChange(event) {
    this.setState({ data: event.target.value });
  }
  handleTopic(event) {
    this.setState({ topic: event.target.value });
  }

  render() {
    if (this.props.status) {
      return (
        <form
          action="http://localhost:9000/posts/make"
          method="POST"
          encType="multipart/form-data"
        >
          <div id="div_textarea" style={{marginBottom:'4rem'}}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon3">
                  Тема
                </span>
              </div>

              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={this.handleTopic}
                name="topic"
              />
              
            </div>

            <select name="theme" className="form-select" aria-label="Default select example">
              <option value="null" selected>
                Вибрати тему
              </option>
              {this.state.map_data}
              <option value="3" onClick={this.addNewTheme}>
                add new theme
              </option>
            </select>

            <div class="mb-3" style={{marginTop:'1rem'}}>
              <input
                class="form-control form-control-sm"
                onChange={this.onChangeHandler}
                name="photo"
                id="formFileSm"
                type="file"
                multiple
              />
            </div>

            <input
              type="text"
              name="author"
              value={this.state.nickname}
              style={{ display: "none" }}
            />
            <textarea
              id="textarea"
              name="text"
              onInput={this.changeHeight}
              onChange={this.handleChange}
            ></textarea>
            <button
              type="submit"
              className="btn btn-success"
              style={{ float: "inline-end" }}
              onClick={this.handleClick}
            >
              Send
            </button>
          </div>
          <HiddenDiv status={this.state.status} closeDiv={this.closeDiv} />
        </form>
      );
    } else {
      return null;
    }
  }
}

export default Textarea;
