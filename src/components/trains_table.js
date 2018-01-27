import React, { Component } from 'react';

import TrainRow from './train_row';


class TrainsTable extends Component {
    render() {
        
        const trainRows = this.props.trains.map((train) => {
            return <TrainRow key={train.name} train={train}/>
        });

        return(
            <div>
                <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Train</th>
                            <th>Time</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Platform</th>
                            <th>Cancelled</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainRows}
                    </tbody>
                </table> 
            </div>
        );
    };

}

export default TrainsTable;