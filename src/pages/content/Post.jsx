import React from "react";
import Cookies from "universal-cookie";
import Item from "./Item";
const cookies = new Cookies();
function useCustomHook(props) {
  this.setState({});
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newObj: [], counter: 0, update_point: true };
  }

  UpdatePoint = () => {
    this.setState({ update_point: !this.state.update_point });
  };

  componentWillMount() {
    let x = this;
    let data = JSON.stringify({
      nickname: cookies.get("nickname"),
      sort: this.state.sort,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let obj = JSON.parse(request.response);
      console.log(obj)
      let map = new Map();
      for (let i = obj.length - 1; i >= 0; i--) {
        if (obj[i].photos === null) {
          if (obj[i].img === null) {
            map.set(
              <Item
                id={obj[i].id}
                topic={obj[i].topic}
                data={obj[i].text}
                favorite={obj[i].favorite}
                photo={obj[i].photos}
                UpdatePoint={x.UpdatePoint}
              />
            );
          } else {
            map.set(
              <Item
                id={obj[i].id}
                topic={obj[i].topic}
                data={obj[i].text}
                favorite={obj[i].favorite}
                photo={obj[i].photos}
                img={obj[i].img}
                UpdatePoint={x.UpdatePoint}
              />
            );
          }
        } else {
          let photo = obj[i].photos;
          photo = photo.split(",");
          if (obj[i].img === null) {
            map.set(
              <Item
                id={obj[i].id}
                topic={obj[i].topic}
                data={obj[i].text}
                photo={photo[0]}
                favorite={obj[i].favorite}
                photo={obj[i].photos}
                UpdatePoint={x.UpdatePoint}
              />
            );
          } else {
            map.set(
              <Item
                id={obj[i].id}
                topic={obj[i].topic}
                data={obj[i].text}
                photo={photo[0]}
                favorite={obj[i].favorite}
                photo={obj[i].photos}
                img={obj[i].img}
                UpdatePoint={x.UpdatePoint}
              />
            );
          }
        }
      }
      x.setState({ newObj: map });
    });
    request.send(data);
  }

  componentWillReceiveProps() {
    let x = this;
    let data = JSON.stringify({
      nickname: cookies.get("nickname"),
      sort: this.props.sort,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let obj = JSON.parse(request.response);
      let map = new Map();
      for (let i = obj.length - 1; i >= 0; i--) {
        if (obj[i].photos === null) {
          if (obj[i].img === null) {
            map.set(
              <Item
                id={obj[i].id}
                topic={obj[i].topic}
                data={obj[i].text}
                favorite={obj[i].favorite}
                photo={obj[i].photos}
                UpdatePoint={x.UpdatePoint}
              />
            );
          } else {
            map.set(
              <Item
                id={obj[i].id}
                topic={obj[i].topic}
                data={obj[i].text}
                favorite={obj[i].favorite}
                photo={obj[i].photos}
                img={obj[i].img}
                UpdatePoint={x.UpdatePoint}
              />
            );
          }
        } else {
          let photo = obj[i].photos;
          photo = photo.split(",");
          if (obj[i].img === null) {
            map.set(
              <Item
                id={obj[i].id}
                topic={obj[i].topic}
                data={obj[i].text}
                photo={photo[0]}
                favorite={obj[i].favorite}
                photo={obj[i].photos}
                UpdatePoint={x.UpdatePoint}
              />
            );
          } else {
            map.set(
              <Item
                id={obj[i].id}
                topic={obj[i].topic}
                data={obj[i].text}
                photo={photo[0]}
                favorite={obj[i].favorite}
                photo={obj[i].photos}
                img={obj[i].img}
                UpdatePoint={x.UpdatePoint}
              />
            );
          }
        }
      }
      x.setState({ newObj: map });
    });
    request.send(data);
  }

  componentDidMount() {
    let x = this;
    let data = JSON.stringify({
      nickname: cookies.get("nickname"),
      sort: this.state.sort,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let obj = JSON.parse(request.response);
      let map = new Map();
      for (let i = obj.length - 1; i >= 0; i--) {
        if (obj[i].photos === null) {
          map.set(
            <Item
              id={obj[i].id}
              topic={obj[i].topic}
              data={obj[i].text}
              favorite={obj[i].favorite}
              photo={obj[i].photo}
              UpdatePoint={x.UpdatePoint}
            />
          );
        } else {
          let photo = obj[i].photos;
          photo = photo.split(",");
          map.set(
            <Item
              id={obj[i].id}
              topic={obj[i].topic}
              data={obj[i].text}
              photo={photo[0]}
              favorite={obj[i].favorite}
              photo={obj[i].photo}
              UpdatePoint={x.UpdatePoint}
            />
          );
        }
      }
      x.setState({ newObj: map });
    });
    request.send(data);
  }

  render() {
    return <div>{this.state.newObj}</div>;
  }
}

export default Post;
