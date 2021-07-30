import React from "react";

class MassageItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteMs = this.deleteMs.bind(this)
  }
  deleteMs(){
      let x = this;
      let elem = document.getElementById(this.props.message_id);
    let data = JSON.stringify({
        code:this.props.message_id
    })
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/notif/delete", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        if(request.responseText === 'done'){
            elem.style.display = 'none';
            x.props.delete();
        }
    })
    request.send(data)
  }

  render() {
    return (
      <div
      id={this.props.message_id}
        style={{
          margin: "5px",
          borderRadius: "20px",
          background: "darkcyan",
          display:'block'
        }}
      >
        <p style={{ fontSize: "small", marginLeft: "1rem" }}>
          {this.props.message_id}
        </p>
        <h1 style={{fontSize:"large"}}>{this.props.message}</h1>
        <p style={{ fontSize: "small", marginLeft: "1rem", float: "left" }}>
          {this.props.date}
        </p>
        <input
          style={{ position: "relative" }}
          type="button"
          value="прочитано"
          onClick={this.deleteMs}
        />
      </div>
    );
  }
}

export default MassageItem;
