import React, { Component } from 'react';
import _ from 'lodash';

import TrainsTable from './trains_table';

class TrainsCard extends Component {

    render() {
        
        if(this.props.stationFound === false){
            return(
                <div className="col-xs-12">
                    <h4>Station not found</h4>
                </div>
            );
        }

        if(_.isEmpty(this.props.selectedStation)){
            return(
                <div className="col-xs-12">
                    <h4>Please select a station</h4>
                </div>
            );
        }
               
        return(
            <div className="card">
                <div className="card-block">
                    <h3 className="card-title">{ this.props.selectedStation.stationName }</h3>
                    <div >
                        <h4>Arriving</h4>
                        <TrainsTable trains={this.props.arriving}/>
                    </div>
                    <div >
                        <h4>Departig</h4>
                        <TrainsTable trains={this.props.departing}/>
                    </div>
                </div>
                
            </div>
        );
    };

}

export default TrainsCard;