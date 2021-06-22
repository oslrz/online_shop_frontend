import React from "react";

class Com_item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", text: "", likes: 0, dislikes: 0 };
    this.handleLike = this.handleLike.bind(this);
    this.handleDis = this.handleDis.bind(this);
  }
  handleLike() {
    let data = JSON.stringify({
      id: this.state.id,
    });
    let x = this;
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/comments/likes", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let like = x.state.likes;
      like++;
      x.setState({ likes: like });
    });
    request.send(data);
  }
  handleDis() {
    let data = JSON.stringify({
      id: this.state.id,
    });
    let x = this;
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/comments/dislikes", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let like = x.state.dislikes;
      like++;
      x.setState({ dislikes: like });
    });
    request.send(data);
  }

  componentDidMount() {
    let data = this.props.data;
    this.setState({ id: data.id, text: data.text });
    let x = this;
    let data1 = JSON.stringify({
      id: data.id,
    });

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/comments/get_count", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let res = JSON.parse(request.response);
      x.setState({ likes: res.likes, dislikes: res.dislikes });
    });
    request.send(data1);
  }

  render() {
    return (
      <div className="comments">
        <p>{this.state.id}</p>
        <p>{this.state.text}</p>
        <div style={{ float: "inline-end", position: "relative" }}>
          <div onClick={this.handleLike} style={{ float: "left" }}>
            &#9757;
          </div>
          <div style={{ float: "left", color: "green" }}>
            {this.state.likes}
          </div>
          <div style={{ float: "left" }} onClick={this.handleDis}>
            &#9759;
          </div>
          <div style={{ float: "left", color: "red" }}>
            {this.state.dislikes}
          </div>
        </div>
      </div>
    );
  }
}

export default Com_item;
