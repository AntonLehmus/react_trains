import React, { Component } from 'react';
import moment from 'moment';

class TrainRow extends Component {
    render() {
        const time = moment(this.props.train.time);
        const cancelled = this.props.train.cancelled;
        
        const clsName= cancelled ? 'bg-warning' : '';

        return(
            <tr className={clsName}>
                <td>{this.props.train.name}</td>
                <td>{time.format('HH:MM')}</td>
                <td>{this.props.train.from}</td>
                <td>{this.props.train.to}</td>
                <td>{this.props.train.platform}</td>
                <td>{cancelled ? <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> :''}</td>
            </tr>
        );
    };

}

export default TrainRow;