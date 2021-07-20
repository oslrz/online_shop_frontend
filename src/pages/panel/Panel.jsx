import React from "react";
import Favourite_list from "./Favourite_list";
import { ContextElemConsumer } from "../Context_element";
class Panel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ContextElemConsumer>
        {value => (
          <div id="panel" className="shadow-sm p-3 mb-5 bg-body rounded">
            <h1>Улюблені пости:</h1>
            <Favourite_list data={value.data}/>
          </div>
        )}
      </ContextElemConsumer>
    );
  }
}

export default Panel;
