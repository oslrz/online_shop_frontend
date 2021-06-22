import React from "react";
import Post from "./Post";
import MakePost from "./MakePost";
import Textarea from "./Textarea";
import Story from "./Story";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: false, topic: null, data: null, majak: false };
  }
  ClickHandl = () => {
    this.setState({ status: !this.state.status });
    console.log(this.state.status);
  };
  Majak = () => {
    this.setState({ majak: !this.state.majak });
  };
  render() {
    if(cookies.get('news')){
      return(
        <Story newsid={cookies.get('news')}/>
      )
    }else{
      return (
        <div id="content">
          <MakePost status={this.state.status} ClickHandl={this.ClickHandl} />
          <Textarea status={this.state.status} Majak={this.Majak} />
          <Post props={this.state.majak}/>
        </div>
      );
    }
    
  }
}

export default Content;
