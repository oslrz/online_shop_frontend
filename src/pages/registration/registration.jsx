import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { phone: "", status: 0, code: null, client_try: "" };
    this.handlePhone = this.handlePhone.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleClient = this.handleClient.bind(this);
  }

  handleClient(event) {
    this.setState({ client_try: event.target.value });
  }
  handlePhone(event) {
    this.setState({ phone: event.target.value });
  }
  handleApply() {
    if (this.state.code === this.state.client_try) {
      let forma = document.getElementById("reg_form");
      forma.submit();
    } else {
      alert("Введіть правильний код");
    }
  }
  handleBttn() {
    let x = this;
    let phone = this.state.phone;
    let data = JSON.stringify({
      phone: phone,
    });
    console.log("data", data);
    let forma = document.getElementById("reg_form");
    forma.style.display = "none";
    let code_form = document.getElementById("accept_code");
    code_form.style.display = "block";

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9000/account/code", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      console.log(request.response);
      x.setState({ code: request.response });
    });
    request.send(data);
  }

  render() {
    return (
      <div>
        <form
          method="POST"
          encType="multipart/form-data"
          action="http://localhost:9000/account/register"
          id="reg_form"
        >
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
                name="nickname"
                required
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
                name="password"
                required
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
                name="email"
                required
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Phone
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                name="phone"
                onChange={this.handlePhone}
                required
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Profile pics
                </span>
              </div>
              <input
                type="file"
                className="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                name="pics"
              />
            </div>
            <button
              style={{ float: "left", marginRight: "1rem" }}
              type="button"
              class="btn btn-primary btn-sm"
              onClick={this.handleBttn.bind(this)}
            >
              Sign up
            </button>
          </div>
        </form>
        <div id="accept_code" style={{ display: "none" }}>
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                SMS code
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              name="sms"
              onChange={this.handleClient.bind(this)}
            />
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            onClick={this.handleApply}
            style={{ float: "left", marginRight: "1rem" }}
          >
            Apply
          </button>
        </div>

        <button
          type="button"
          class="btn btn-primary btn-sm"
          onClick={this.props.closeReg}
        >
          Back
        </button>
      </div>
    );
  }
}

export default Register;
