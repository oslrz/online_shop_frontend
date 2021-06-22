import React from "react";
import Navbar from "./navbar";
import Content from "./Content";
import Panel from "./Panel";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if(cookies.get('nickname')){
      return (
        <div>
          <Navbar />
          <Content />
          <Panel />
        </div>
      );
    }else{
      return(<Navbar />)
    }
    
  }
}

export default FrontPage;
