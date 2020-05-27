import React, { Component } from 'react';

class ListDisplay extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                {Object.values(this.props.obj).length !== 0 && Object.values(this.props.obj).map(object => {
                    return (
                        <li>{object.name}</li>
                    );
                })}
            </div>
        );
    }
}
export default ListDisplay;