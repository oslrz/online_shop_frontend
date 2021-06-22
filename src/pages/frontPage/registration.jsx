import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nickname:'',password:'',email:''}
    this.handleNick = this.handleNick.bind(this)
    this.handlePass = this.handlePass.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleBttn = this.handleBttn.bind(this)
  }
  handleEmail(event){
    this.setState({email:event.target.value})
  }
  handleNick(event){
    this.setState({nickname:event.target.value})
  }
  handlePass(event){
    this.setState({password:event.target.value})
  }
  handleBttn(){
      let x = this.props
    let data = JSON.stringify({
        nickname:this.state.nickname,
        password:this.state.password,
        email:this.state.email
      })
      let request = new XMLHttpRequest();
      request.open("POST", "http://localhost:9000/account/register", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.addEventListener("load", function () {
        if(request.response === 'yes'){
            x.closeReg();
            window.location.reload()
        }else{
            alert(request.response)
        }
      });
      request.send(data);
  }


  render() {
    return (
      <div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Nickname
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onInput={this.handleNick}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Password
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onInput={this.handlePass}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Email
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onInput={this.handleEmail}
          />
        </div>
        <button type="button" class="btn btn-primary btn-sm" onClick={this.handleBttn}>Sign up</button>
      </div>
    );
  }
}

export default Register;
