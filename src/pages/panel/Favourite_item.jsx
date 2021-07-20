import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Favourite_item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null, topic: null, photos: null, vision: true };
    this.removeFromFavourite = this.removeFromFavourite.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  deleteItem() {
    this.setState({ vision: false });
  }
  removeFromFavourite() {
    let x = this;
    let data = JSON.stringify({
      nickname: cookies.get("nickname"),
      code: this.state.id,
    });
    console.log(data);
    let request = new XMLHttpRequest();
    request.open(
      "POST",
      "http://localhost:9000/posts/remove_from_favourite",
      true
    );
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      x.setState({ favorite: false });
    });
    request.send(data);
  }
  componentDidMount() {
    let id = this.props.id;
    let topic = this.props.topic;
    let author = this.props.author;
    this.setState({
      id: id,
      topic: topic,
      author: author,
    });
  }
  handleClick() {
    const link = window.location.href + this.props.id;
    window.location.href = link;
  }
  render() {
    if (this.state.vision) {
      return (
        <div className="favourite_item" onClick={this.handleClick}>
          <h1 style={{ float: "left", marginLeft: "1rem" }}>
            {this.state.topic}
          </h1>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            style={{ float: "inline-end" }}
            onClick={(e) => {
              e.stopPropagation();
              this.removeFromFavourite();
              this.deleteItem();
            }}
          ></button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Favourite_item;
