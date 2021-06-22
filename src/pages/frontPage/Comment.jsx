import React from "react";
import Com_item from "./com_item";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Comments: [], counter: 0};
  }
  componentDidMount(){
    let x = this;
    let data = JSON.stringify({
      id:this.props.id
    })
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/comments/get", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let req = JSON.parse(request.response)
      let map = new Map();
      req.forEach(element => {
          console.log('json',element);
          map.set(<Com_item data={element}/>)
      });
      x.setState({Comments:map})
    });
    request.send(data);
  }
  
  

  render() {
      return(
        <div>
            <h1>Comments</h1>
            {this.state.Comments}
        </div>
      )
  }
}

export default Comment;
