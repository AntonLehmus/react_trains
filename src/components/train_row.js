import React, { Component } from 'react';
import moment from 'moment';

class TrainRow extends Component {
    render() {
        const time = moment(this.props.train.time);

        return(
            <tr>
                <td>{this.props.train.name}</td>
                <td>{time.format('DD.MM HH:MM')}</td>
                <td>{this.props.train.from}</td>
                <td>{this.props.train.to}</td>
                <td>{this.props.train.platform}</td>
                <td>{this.props.train.cancelled}</td>
            </tr>
        );
    };

}

export default TrainRow;