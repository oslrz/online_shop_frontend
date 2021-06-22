import React from "react";
import Item from "./Item";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newObj: [], counter: 0};
  }

  componentWillMount() {
    let x = this;
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let obj = JSON.parse(request.response);
      let map = new Map();
      for (let i = obj.length - 1; i >= 0; i--) {
        map.set(
          obj[i].id,
          <Item id={obj[i].id} topic={obj[i].topic} data={obj[i].text} />
        );
      }
      x.setState({ newObj: map });
    });
    request.send();
  }

  componentWillReceiveProps() {
    let x = this;
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let obj = JSON.parse(request.response);
      let map = new Map();
      for (let i = obj.length - 1; i >= 0; i--) {
        map.set(
          obj[i].id,
          <Item id={obj[i].id} topic={obj[i].topic} data={obj[i].text} />
        );
      }
      x.setState({ newObj: map });
    });
    request.send();
  }

  render() {

      return <div>{this.state.newObj}</div>;
  }
}

export default Post;
