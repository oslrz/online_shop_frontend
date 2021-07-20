import React from "react";
import Cookies from "universal-cookie";
import Favourite_item from "./Favourite_item";
const cookies = new Cookies();

class Favourite_list extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    let x = this;
    let data = JSON.stringify({
      nickname: cookies.get("nickname"),
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/get_favorite", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      console.log("request.response", request.response);
      if (request.response) {
        let resp = JSON.parse(request.response);
        
        let map = new Map();
        let i = 0;
        resp.forEach((element) => {
          map.set(
            <Favourite_item
              id={element[0].id}
              topic={element[0].topic}
              author={element[0].author}
            />
          );
          i++;
        });
        console.log(map);
        x.setState({ data: map });
        x.forceUpdate();
      }
    });
    request.send(data);
  }
  
  componentWillReceiveProps() {
    let x = this;
    let arr = this.props.data;
    if (arr.length !== 0) {
      arr.forEach((element) => {
        x.setState({ data: null });
        let data = JSON.stringify({
          code: element,
        });
        let request = new XMLHttpRequest();
        request.open(
          "POST",
          "http://localhost:9000/posts/get_favorite_arr",
          true
        );
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
          if (request.response) {
            let resp = JSON.parse(request.response);
            let map = new Map(x.state.data);
            map.set(
              <Favourite_item
                id={resp.id}
                topic={resp.topic}
                author={resp.topic}
              />
            );
            x.setState({ data: map });
          }
        });
        request.send(data);
      });
    } else {
      x.setState({ data: null });
    }
  }

  render() {
    if (this.state.data !== null) {
      return <div>{this.state.data}</div>;
    } else {
      return null;
    }
  }
}

export default Favourite_list;
