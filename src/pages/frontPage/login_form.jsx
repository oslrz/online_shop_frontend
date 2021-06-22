import React from "react";
import Cookies from 'universal-cookie';
import Register from "./registration";
const cookies = new Cookies();
class Login_form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "", password: "", nickname: null,register:false};
    this.handleLogin = this.handleLogin.bind(this)
    this.handlePass = this.handlePass.bind(this)
    this.handleLog = this.handleLog.bind(this)
    this.handleOut = this.handleOut.bind(this)
    this.openRegistr = this.openRegistr.bind(this)
  }
  handleLogin(event){
    this.setState({login:event.target.value})
  }
  handlePass(event){
    this.setState({password:event.target.value})
  }
  handleLog(){
    let x = this
    let data = JSON.stringify({
      login:this.state.login,
      password:this.state.password
    })
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/account/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      
      let data = request.response;
      if(data === "none"){
        alert('Введіть правильні данні')
      }else{
        data = JSON.parse(data);
        cookies.set('nickname',data.nickname)
        cookies.set('password',data.password)
        x.setState({nickname:data.nickname})
        window.location.reload();
      }
    });
    request.send(data);
  }
  componentWillMount(){
    if(cookies.get('nickname')){
      this.setState({nickname:cookies.get('nickname')})
      this.setState({login:cookies.get('nickname')})
      this.setState({password:cookies.get('password')})
    }
  }
  handleOut(){
    cookies.remove('nickname');
    cookies.remove('password');
    this.setState({nickname:null});
    this.setState({login:""});
    this.setState({password:""})
    window.location.reload();
  }
  closeReg = () =>{
    this.setState({register:!this.state.register})
    
  }
  openRegistr(){
    this.setState({register:!this.state.register})
  }
  render() {
    if(this.state.register){
      return(
        <Register closeReg={this.closeReg}/>
      )
    }else{
      if(this.state.nickname === null){
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
                onInput={this.handleLogin}
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
            <button type="button" class="btn btn-primary btn-sm" onClick={this.handleLog}>Log in</button>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.openRegistr} style={{marginLeft:'1rem'}}>Sign up</button>
          </div>
        );
      }else{
        return(
          <div style={{color:"white"}}>
            {this.state.nickname}
            <button type="button" className="btn btn-info" onClick={this.handleOut}>Exit</button>
          </div>
        )
      }
    }
    
    
  }
}
export default Login_form;
