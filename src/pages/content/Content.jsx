import React from "react";
import Post from "./Post";
import MakePost from "./MakePost";
import Textarea from "./Textarea";
import Story from "./Story";
import Sorting from "./Sorting";
import BanList from "./BanList";
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
      changing: false,
      count:0,
      ban_list:false,
      messageElement:[]
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleBan = this.handleBan.bind(this);
    this.changeVision = this.changeVision.bind(this);
  }

  changeVision(){
    let block = document.getElementById('vuizd');
    if(block.style.display === 'none'){
      block.style.display = 'block'
    }else{
      block.style.display = 'none'
    }
  }

 
  handleBan(){
    this.setState({ban_list:!this.state.ban_list})
  }

  handleClick() {
    this.setState({ changing: !this.state.changing });
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
    link = link.split("/");
    let bttn = null;
    let ban_bttn = null; 
    let adm =cookies.get("admin")
    if (adm === 'true') {
      if (this.state.changing) {
        bttn = (
          <button
            style={{ margin: "2px" }}
            type="button"

            className="btn btn-outline-primary"
            onClick={this.handleClick}
          >
            make changes
          </button>
        );
      } else {
        bttn = (
          <button
            style={{ margin: "2px" }}
            type="button"
            className="btn btn-primary"
            onClick={this.handleClick}
          >
            make changes
          </button>
        );
      }
    }

    if (adm === 'true') {
      ban_bttn =  <button
      style={{ margin: "2px" }}
      type="button"
      className="btn btn-primary"
      onClick={this.handleBan}
    >
      ban
    </button>
    }

    if(this.state.ban_list === true){
      return <BanList/>
    }else{
      if (link[3] !== "") {
      return <Story newsid={link[3]} />;
    } else {
      return (
        <div id="content" className="shadow-sm p-3 mb-5 bg-body rounded">


        {ban_bttn}

          {bttn}
          <MakePost status={this.state.status} ClickHandl={this.ClickHandl} />
          <Sorting sort={this.Sort} />
          <Textarea status={this.state.status} Majak={this.Majak} />
          <ContextElemConsumer>
            {(value) => (
              <Post
                data={value.data}
                props={this.state.majak}
                sort={this.state.sort}
                changing={this.state.changing}
              />
            )}
          </ContextElemConsumer>
        </div>
      );
    }
    }

    
  }
}

export default Content;
