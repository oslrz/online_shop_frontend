import React from "react";


class MakePost extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let data;
        if(this.props.status){
            data = 'exit';
        }else{
            data = 'make post'
        }
        return(
            <button className="btn btn-primary" onClick={this.props.ClickHandl} style={{float:"left"}}>
                {data}
            </button>
        )
    }
}


export default MakePost; 