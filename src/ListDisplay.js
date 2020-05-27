import React, { Component } from 'react';

class ListDisplay extends Component {
    render() {
        let contents;
        if (this.props.obj !== undefined && this.props.obj !== null) {
            contents =
                Object.values(this.props.obj).length !== 0 && Object.values(this.props.obj).map(object => {
                    return (
                        <li>{object.name}</li>
                    );
                })
        } else {
            contents = "None yet!"
        }
        return (
            <div style={{ margin: "15px" }}>
                <h3>{this.props.title}</h3>
                {contents}
            </div>
        );
    }
}
export default ListDisplay;