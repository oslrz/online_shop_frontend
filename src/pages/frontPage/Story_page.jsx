import React from "react";

class Story_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", title: "", text: "", author: "" };
  }
  componentDidMount() {
    let data = JSON.parse(this.props.data);
    console.log('componentDidMount()',data)
    this.setState({
      id: data[0].id,
      title: data[0].topic,
      text: data[0].text,
      author: data[0].author,
    })
  }
  render() {
    if (this.state.author === "") {
      return null;
    } else {

      return (
        <div id='story_page'>
          <h1>{this.state.title}</h1>
          <p>{this.state.text}</p>
          <div>id: {this.state.id}</div>
          <div>author: {this.state.author}</div>
        </div>
      );
    }
  }
}

export default Story_page;
