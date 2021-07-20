import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class ContextElem extends Component {
  state = {
    value: false
  };

  toggleTheme = () => {
    this.setState(prevState => {
      return {
        value: prevState.value === false ? true : false
      };
    });
  };

  render() {
    return (
      <Provider
        value={{ value: this.state.value, toggleTheme: this.toggleTheme }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export {Provider as ContextElemProvider, Consumer as ContextElemConsumer };

