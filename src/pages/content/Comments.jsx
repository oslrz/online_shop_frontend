import React from "react";
import Comment from "./Comment";
import Make_Coment from "./Make_Coment";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Comments: [], counter: 0 };
  }

  render() {
    return (
      <div>
        <Make_Coment id={this.props.id}/>
        <Comment id={this.props.id}/>
      </div>
    );
  }
}

export default Comments;
