import React, { useContext } from "react";
import Cookies from "universal-cookie";
import { ContextElemConsumer } from "../Context_element";
import { Route, BrowserRouter} from "react-router-dom"

const cookies = new Cookies();
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      dislikes: 0,
      favorite: this.props.favorite,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDis = this.handleDis.bind(this);
    this.addToFavourive = this.addToFavourive.bind(this);
    this.removeFromFavourite = this.removeFromFavourite.bind(this);
  }

  removeFromFavourite() {
      let x = this;
      let data = JSON.stringify({
        nickname: cookies.get("nickname"),
        code: this.props.id,
      });
      let request = new XMLHttpRequest();
      request.open(
        "POST",
        "http://localhost:9000/posts/remove_from_favourite",
        true
      );
      request.setRequestHeader("Content-Type", "application/json");
      request.addEventListener("load", function () {
        x.setState({
          favorite: false,
        });
      });
      request.send(data);
  }

  addToFavourive(event) {
    let x = this;
    let data = JSON.stringify({
      nickname: cookies.get("nickname"),
      code: this.props.id,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/add_to_favourite", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      x.setState({
        favorite: true,
      });
    });
    request.send(data);
  }

  componentDidMount() {
    this.setState({_isMounted:true})
    let x = this;
    let data = JSON.stringify({
      id: this.props.id,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/get_count", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let new_data = JSON.parse(request.response);
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
    const link = window.location.href+this.props.id
    window.location.href = link;
  }

  handleLike() {
    let lik = this.state.likes;
    lik++;
    this.setState({ likes: lik });
    let data = JSON.stringify({
      id: this.props.id,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/like", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {});
    request.send(data);
  }

  handleDis() {
    let dis = this.state.dislikes;
    dis++;
    this.setState({ dislikes: dis });
    let data = JSON.stringify({
      id: this.props.id,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/dislike", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {});
    request.send(data);
  }

  render() {
    let bttn;
    if (!this.state.favorite) {
      bttn = (
        <ContextElemConsumer>
          {(value) => (
            <button
              className="btn btn-info"
              style={{ position: "absolute", left: "96%" }}
              onClick={(e) => {
                e.stopPropagation();
                value.add(this.props.id);
                this.addToFavourive();
              }}
            >
              add
            </button>
          )}
        </ContextElemConsumer>
      );
    } else {
      bttn = (
        <ContextElemConsumer>
          {(value) => (
            <button
              className="btn btn-info"
              style={{ position: "absolute", left: "96%" }}
              onClick={(e) => {
                e.stopPropagation(0);
                value.remove(this.props.id);
                this.removeFromFavourite();
              }}
            >
              del
            </button>
          )}
        </ContextElemConsumer>
      );
    }
    
    if (this.props.img === undefined) {
      return (
        <div className="posts" onClick={this.handleClick.bind(this)}>
          <div className="post_photo">
            <img
              src={"http://localhost:9000/photo/default.jpg"}
              alt=""
              style={{ height: "95px", float: "left", width: "125px" }}
            />
          </div>
          {bttn}
          <h1 style={{ marginLeft: "10rem" }}>{this.props.topic}</h1>
          <p className="textblock">{this.props.data}</p>
          <div
            style={{ float: "inline-end", position: "relative", bottom: "8px" }}
          >
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
    } else {
      return (
        <div className="posts" onClick={this.handleClick.bind(this)}>
          <div className="post_photo">
            <img
              src={"http://localhost:9000/" + this.props.img}
              alt=""
              style={{ height: "95px", float: "left", width: "125px" }}
            />
          </div>
          {bttn}
          <h1 style={{ marginLeft: "10rem" }}>{this.props.topic}</h1>
          <p className="textblock">{this.props.data}</p>
          <div
            style={{ float: "inline-end", position: "relative", bottom: "8px" }}
          >
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
}

export default Item;
