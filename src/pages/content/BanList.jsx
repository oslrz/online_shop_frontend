import React from "react";
import Cookies from "universal-cookie";
import BanItem from "./BanItem";


class BanList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {elements:[]};
  }
  componentDidMount() {
    let x = this;
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/account/get", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      let data = JSON.parse(request.response)
      console.log(data)
      let map = new Map()
      data.forEach(element => {
          map.set(<BanItem data={element}/>)
      });
      x.setState({elements:map})
    });
    request.send();
  }

  render() {
    return <table class="table" style={{width:'70%',float:'left'}}> 
      <tr style={{color:'coral'}}>
        <th scope="col">id</th>
        <th scope="col">nickname</th>
        <th scope="col">pass</th>
        <th scope="col">email</th>
        <th scope="col">admin</th>
        <th scope="col">ban</th>
      </tr>
      <tbody>
        {this.state.elements}
      </tbody>
      
    </table>
    
  }
}

export default BanList;
