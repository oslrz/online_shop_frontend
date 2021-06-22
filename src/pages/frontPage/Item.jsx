import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { likes: 0, dislikes: 0 };
    this.handleClick = this.handleClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDis = this.handleDis.bind(this);
  }
  componentDidMount() {
    let x = this;
    let data = JSON.stringify({
      id: this.props.id,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/get_count", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let new_data = JSON.parse(request.response);
      console.log(x.props.id,new_data[0])
      if (new_data[0].likes === null && new_data[0].dislikes !== null) {
        x.setState({ dislikes: new_data[0].dislikes });
      } else if (new_data[0].likes !== null && new_data[0].dislikes === null) {
        x.setState({ likes: new_data[0].likes });
      } else {
        x.setState({
          likes: new_data[0].likes,
          dislikes: new_data[0].dislikes,
        });
      }
    });
    request.send(data);
  }
  handleClick() {
    cookies.set("news", this.props.id);
    window.location.reload();
  }

  handleLike() {
    let lik = this.state.likes;
    lik++;
    this.setState({ likes: lik });
    let x = this;
    let data = JSON.stringify({
      id: this.props.id,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/like", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
    });
    request.send(data);
  }

  handleDis() {
    let dis = this.state.dislikes;
    dis++;
    this.setState({ dislikes: dis });
    let x = this;
    let data = JSON.stringify({
      id: this.props.id,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/dislike", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
    });
    request.send(data);
  }

  render() {
    return (
      <div className="posts">
        <h1>{this.props.topic}</h1>
        <p>{this.props.data}</p>
        <p>{this.props.id}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleClick}
        >
          Більше
        </button>
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

export default Item;
