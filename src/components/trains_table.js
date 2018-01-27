import React, { Component } from 'react';


class TrainsTable extends Component {
    render() {
        return(
            <div>
                <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Train</th>
                            <th>Arriving</th>
                            <th>Departing</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Platform</th>
                            <th>Cancelled</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table> 
            </div>
        );
    };

}

export default TrainsTable;