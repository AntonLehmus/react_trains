import React, { Component } from 'react';
import _ from 'lodash';

import TrainsTable from './trains_table';
import Loading from './loading';

class TrainsCard extends Component {

    render() {

        if (this.props.stationFound === false) {
            return (
                <div className="col-12">
                    <h4>Station not found</h4>
                </div>
            );
        }

        if (_.isEmpty(this.props.selectedStation)) {
            return (
                <div className="col-12">
                    <h4>Please select a station</h4>
                </div>
            );
        }

        if(this.props.loading){
            return(
                <div>
                    <h2>{this.props.selectedStation.stationName}</h2>
                    <Loading/>
                </div>
            );
        }

        return (
            <div>
                <h2>{this.props.selectedStation.stationName}</h2>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Arriving</h4>
                        <TrainsTable trains={this.props.arriving} />
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Departig</h4>
                        <TrainsTable trains={this.props.departing} />
                    </div>
                </div>
            </div>
        );
    };

}

export default TrainsCard;