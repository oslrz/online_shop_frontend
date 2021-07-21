import React from "react";

class Story_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", title: "", text: "", author: "", photo: "" };
  }
  componentDidMount() {
    let data = JSON.parse(this.props.data);
    let map = new Map();
    if (data[0].photo === null) {
      let photo = data[0].photos;
      photo = photo.split(",");
      console.log("photo", photo);

      let i = 0;

      photo.forEach((element) => {
        console.log("elements", element);
        if (i === 0) {
          map.set(
            <img
              src={"http://localhost:9000/" + element}
              className="story_page_photo"
              alt=""
            />
          );
        } else {
          map.set(
            <img
              src={"http://localhost:9000/" + element}
              className="story_page_photo"
              alt=""
            />
          );
        }
        i++;
      });
    }

    this.setState({
      id: data[0].id,
      title: data[0].topic,
      text: data[0].text,
      author: data[0].author,
      photo: map,
    });
  }
  render() {
    if (this.state.author === "") {
      return null;
    } else {
      if (this.state.photo === "" || this.state.photo === null) {
        return (
          <div id="story_page">
            <h1 id="header_post" style={{ position: "relative" }}>
              {this.state.title}
            </h1>
            <p>{this.state.text}</p>
            <div>id: {this.state.id}</div>
            <div>author: {this.state.author}</div>
          </div>
        );
      } else {
        return (
          <div id="story_page">
            <h1 id="header_post" style={{ position: "relative" }}>
              {this.state.title}
            </h1>
            <div style={{ width: "90%", position: "relative", left: "5%" }}>
              {this.state.photo}
            </div>
            <p style={{ width: "90%", position: "relative", left: "5%" }}>
              {this.state.text}
            </p>
            <div style={{ position: "relative", left: "3%" }}>
              id: {this.state.id}
            </div>
            <div style={{ position: "relative", left: "3%" }}>
              author: {this.state.author}
            </div>
          </div>
        );
      }
    }
  }
}

export default Story_page;
