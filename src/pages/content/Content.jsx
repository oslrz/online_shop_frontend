import React from "react";
import Post from "./Post";
import MakePost from "./MakePost";
import Textarea from "./Textarea";
import Story from "./Story";
import Sorting from "./Sorting";
import Cookies from "universal-cookie";
import { ContextElemConsumer } from "../Context_element";

const cookies = new Cookies();

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      topic: null,
      data: null,
      majak: false,
      sort: "all",
    };
  }
  ClickHandl = () => {
    this.setState({ status: !this.state.status });
  };
  Majak = () => {
    this.setState({ majak: !this.state.majak });
  };
  Sort = (value) => {
    this.setState({ sort: value }, () => {
      this.forceUpdate();
    });
  };
  render() {
    let link = window.location.href;
    link = link.split('/');
    if (link[3] !== "") {
      return <Story newsid={link[3]} />;
    } else {
      return (
        <div id="content"  class="shadow-sm p-3 mb-5 bg-body rounded">
          <MakePost status={this.state.status} ClickHandl={this.ClickHandl} />
          <Sorting sort={this.Sort} />
          <Textarea status={this.state.status} Majak={this.Majak} />
          <ContextElemConsumer>
            {value =>(
              <Post data={value.data} props={this.state.majak} sort={this.state.sort} />
            )}
            
          </ContextElemConsumer>
          
        </div>
      );
    }
  }
}

export default Content;
