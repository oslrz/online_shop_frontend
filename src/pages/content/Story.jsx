import React from "react";
import Story_page from "./Story_page";
import Comments from "./Comments";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = { news: null };
  }
  componentDidMount() {
    console.log("this.props.newsid", this.props.newsid);
    let x = this;
    let data = JSON.stringify({
      id: this.props.newsid,
    });
    console.log('data', data);
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/id", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let obj = request.response;
      console.log("obj", obj);
      x.setState({ news: obj });
    });
    request.send(data);
  }
  render() {
    if (this.state.news === null) {
      return <p>no data = {this.state.news}</p>;
    } else {
      return (
        <div style={{height:'max-content',width:'90rem',float:'left'}}>
          <Story_page data={this.state.news} />
          <Comments id={this.props.newsid}/>
        </div>
      );
    }
  }
}

export default Story;
