import React from "react";
import Response from "./Response";
class Comment_item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      text: "",
      likes: 0,
      dislikes: 0,
      img: null,
      profile_pics: "",
      vision: false,
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleDis = this.handleDis.bind(this);
    this.makeReply = this.makeReply.bind(this);
  }
  makeReply() {
    this.setState({ vision: !this.state.vision });
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
    if (data.photos) {
      let photo = data.photos;
      photo = photo.split(",");
      let map = new Map();
      photo.forEach((element) => {
        map.set(
          <img
            src={"http://localhost:9000/" + element}
            className="story_page_photo"
            alt=""
          />
        );
      });
      this.setState({ img: map });
    }
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/comments/get_count", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let res = JSON.parse(request.response);
      let data3 = JSON.stringify({
        author: data.author,
      });
      let request2 = new XMLHttpRequest();
      request2.open("POST", "http://localhost:9000/comments/get_photo", true);
      request2.setRequestHeader("Content-Type", "application/json");
      request2.addEventListener("load", function () {
        let req = JSON.parse(request2.response);
        x.setState({
          profile_pics: req.photos,
          likes: res.likes,
          dislikes: res.dislikes,
        });
      });
      request2.send(data3);
    });
    request.send(data1);
  }

  render() {
    let author = this.props.data.author;
    let profile_pics = <div style={{ width: "15%" }}></div>;
    if (this.state.profile_pics || this.state.profile_pics !== null) {
      profile_pics = (
        <div style={{ width: "15%" }}>
          <img
            style={{
              width: "90px",
              margin: "0.5rem",
              border: "1px solid black",
              float: "left",
              minHeight: "85px",
            }}
            src={"http://localhost:9000/" + this.state.profile_pics}
            className="profile_pics"
            alt=""
          />
          <p>{this.state.id}</p>
        </div>
      );
    } else {
      profile_pics = (
        <div style={{ width: "15%" }}>
          <img
            style={{
              width: "90px",
              margin: "0.5rem",
              border: "1px solid black",
              float: "left",
              minHeight: "85px",
            }}
            src={"http://localhost:9000/photo/default.jpg"}
            className="profile_pics"
            alt=""
          />
          <p>{this.state.id}</p>
        </div>
      );
    }
    let replie = null;
    if (this.props.replies) {
      replie = <p>replied:{this.props.replies}</p>;
    }
    if (this.state.img === undefined) {
      if(replie === null){
        return (
          <div>
            <div className="comments" id={this.props.data.id}>

              <button
                style={{ position: "absolute", left: "86rem" }}
                type="button"
                className="btn btn-warning"
                onClick={this.makeReply.bind(this)}
              >
                reply
              </button>
              {profile_pics}
              <p className="com_text">{this.state.text}</p>
  
              <div className="com_likes">
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
            <Response
              author={author}
              vision={this.state.vision}
              code={this.props.data.id}
              id={this.props.id}
            />
          </div>
        );
      }else{
        <div>
            <div className="comments" id={this.props.data.id}>
              {replie}
              <button
                style={{ position: "absolute", left: "86rem" }}
                type="button"
                className="btn btn-warning"
                onClick={this.makeReply.bind(this)}
              >
                reply
              </button>
              {profile_pics}
              <p className="com_text">{this.state.text}</p>
  
              <div className="com_likes">
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
            <Response
              author={author}
              vision={this.state.vision}
              code={this.props.data.id}
              id={this.props.id}
            />
          </div>
      }
      
    } else {
      if(replie === null){
        return (
          <div>
            <div className="comments" id={this.props.data.id}>
              <button
                type="button"
                style={{ position: "absolute", left: "86rem" }}
                className="btn btn-warning"
                onClick={this.makeReply.bind(this)}
              >
                reply
              </button>
              {profile_pics}
              {this.state.img}
              <p className="com_text">{this.state.text}</p>
              <div className="com_likes">
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
            <Response
              author={author}
              vision={this.state.vision}
              code={this.props.data.id}
              id={this.props.id}
            />
          </div>
        );
      }else{
        return (
          <div>
            <div className="comments" id={this.props.data.id}>
              {replie}
              <button
                type="button"
                style={{ position: "absolute", left: "86rem" }}
                className="btn btn-warning"
                onClick={this.makeReply.bind(this)}
              >
                reply
              </button>
              {profile_pics}
              {this.state.img}
              <p className="com_text">{this.state.text}</p>
              <div className="com_likes" style={{top:"-2rem"}}>
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
            <Response
              author={author}
              vision={this.state.vision}
              code={this.props.data.id}
              id={this.props.id}
            />
          </div>
        );
      }
      
    }
  }
}

export default Comment_item;
