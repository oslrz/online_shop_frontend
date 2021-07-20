import React from "react";
import Cookies from "universal-cookie";


const cookies = new Cookies();


class Make_Coment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { state: false,data:"",nickname:cookies.get('nickname'),id:this.props.id};
    this.handleChange = this.handleChange.bind(this);
    this.changeHeight = this.changeHeight.bind(this);

    this.makeCom = this.makeCom.bind(this);
  }
  makeCom() {
    this.setState({ state: !this.state.state });
    let doc = document.getElementById("make_com_div");
    let bttn = document.getElementById("bttn_hidn");
    let style = doc.style.display;
    if (style === "none") {
      bttn.style.display = "block";
      doc.style.display = "block";
    } else {
      bttn.style.display = "none";
      doc.style.display = "none";
    }
  }

  changeHeight() {
    let txt = document.getElementById("textarea");
    txt.style.height = txt.scrollHeight + "px";
  }
  handleChange(event) {
    this.setState({ data: event.target.value });
  }


  render() {
    let text;
    if (!this.state.state) {
      text = "make comment";
    } else {
      text = "Close";
    }
    return (
      <div>
        <button type="button" class="btn btn-primary" onClick={this.makeCom} style={{marginTop:'1rem'}}>
          {text}
        </button>
        <form action="http://localhost:9000/comments/make_comment" method="POST" encType="multipart/form-data" id="make_com_div" style={{ display: "none" }}>
          <textarea
            id="textarea"
            onInput={this.changeHeight}
            onChange={this.handleChange}
          ></textarea>
          <input type="text" value={this.state.data} name='text' style={{display:'none'}}/>
          <input type="text" value={this.state.id} name='id' style={{display:'none'}}/>
          <input type="text" value={this.state.nickname} name='author' style={{display:'none'}}/>
          <input type="file" name='photo' multiple/>
          <button
            style={{ display: "none" }}
            id="bttn_hidn"
            type="submit"
            className="btn btn-success"
            style={{ float: "inline-end" }}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Make_Coment;
