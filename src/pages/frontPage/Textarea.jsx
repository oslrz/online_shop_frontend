import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      topic: "",
      value: "",
      selectedFile: null,
      loaded: 0,
      fileName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTopic = this.handleTopic.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
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

  handleClick() {
    const formData = new FormData();
    // formData.append("file", this.state.selectedFile);
    formData.append("fileName", this.state.fileName);
    formData.append("topic", this.state.topic);
    formData.append("text", this.state.data);
    formData.append("author", cookies.get("nickname"));
    let x = this.props;
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/make", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      console.log("response", request.response);
      if (request.responseText === "ok") {
        // alert('congratulation!')
        x.Majak();
      } else {
        alert("error!");
      }
    });
    request.send(formData);
    
    
  
    // try {
    //   const res = axios.post(
    //     "http://localhost:9000/posts/upload",
    //     formData
    //   );
    //   console.log(res);
    // } catch (ex) {
    //   console.log(ex);
    // }
  }

  render() {
    if (this.props.status) {
      return (
        <div id="div_textarea">
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
            />
          </div>
          <input type="file" name="file" onChange={this.onChangeHandler} />
          <textarea
            id="textarea"
            onInput={this.changeHeight}
            onChange={this.handleChange}
          ></textarea>
          <button
            type="button"
            className="btn btn-success"
            style={{ float: "inline-end" }}
            onClick={this.handleClick}
          >
            Send
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Textarea;
