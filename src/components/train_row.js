import React, { Component } from 'react';

class TrainRow extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.train.name}</td>
                <td>{this.props.train.time}</td>
                <td>{this.props.train.from}</td>
                <td>{this.props.train.to}</td>
                <td>{this.props.train.platform}</td>
                <td>{this.props.train.cancelled}</td>
            </tr>
        );
    };

}

export default TrainRow;