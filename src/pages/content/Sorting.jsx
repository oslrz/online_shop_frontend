import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    let x = this;
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/theme/get", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let data = JSON.parse(request.response)
      let map = new Map();
      data.forEach(element => {
        map.set(<option value={element.theme}>{element.theme}</option>)
      });
      x.setState({data:map})
    });
    request.send();
    this.props.sort('All')
  }

  handleChange(event){
    this.props.sort(event.target.value)
  }


  render() {
    return (
    <select className="form-select" aria-label="Default select example" style={{float:'inline-end',width:'max-content'}} onChange={this.handleChange}>
        <option value="All" selected>All</option>
        {this.state.data}
      </select>
    );
  }
}

export default Sorting;
