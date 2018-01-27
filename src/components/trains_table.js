import React, { Component } from 'react';
import _ from 'lodash';


class TrainsTable extends Component {

    render() {
        if(_.isEmpty(this.props.activeStation)){
            return(
                <div className="col-xs-12">
                    <h4>Please select a station</h4>
                </div>
            );
        }
        
        return(
            <div>
            <h3>{ this.props.activeStation.stationName }</h3>
                <div className="row">
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
            </div>
        );
    };

}

export default TrainsTable;