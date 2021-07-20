import React, { useState } from "react";
import { ContextElemProvider } from "./Context_element";
import Cookies from "universal-cookie";
import Navbar from "./registration/navbar";
import Content from "./content/Content";
import Panel from "./panel/Panel";

const cookies = new Cookies();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Favorite: [] };
    this.addToFavorite = this.addToFavorite.bind(this);
    this.removeFromFavorite = this.removeFromFavorite.bind(this);
  }
  componentDidMount() {
    let x = this;
    let data = JSON.stringify({
      nickname: cookies.get("nickname"),
    });
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/posts/get_favorite", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      if (request.response) {
        let req = JSON.parse(request.response);
        let arr = [];
        req.forEach((element) => {
          arr.push(element[0].id);
        });
        x.setState({ Favorite: arr });
        x.forceUpdate()
      }
    });
    request.send(data);
  }
  addToFavorite(code) {
    console.log("addToFavorite", code);
    let data = this.state.Favorite;
    data.push(code);
    this.setState({ Favorite: data }, () => {
      console.log(this.state.Favorite);
    });
  }
  removeFromFavorite(code) {
    console.log("removeFromFavorite", code);
    let data = this.state.Favorite;
    for (var i = 0; i < data.length; i++) {
      if (data[i] === code) {
        data.splice(i, 1);
      }
    }
    this.setState({ Favorite: data }, () => {
      console.log(this.state.Favorite);
    });
  }
  render() {
    if(cookies.get('nickname')){
    return (
      <ContextElemProvider
        value={{
          add: this.addToFavorite,
          remove: this.removeFromFavorite,
          data: this.state.Favorite,
        }}
      >
        <Navbar/>
        <Content/>
        <Panel/>
      </ContextElemProvider>
    );
      }
      else{
        return(
          <Navbar/>
        )
      }
  }
}

export default App;
