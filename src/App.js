import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

import SearchBar from './components/search_bar';
import TraisCard from './components/trains_card';

const ROOT_URL = 'https://rata.digitraffic.fi/api/v1';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stations: [],
      selectedStation: {},
      arriving_trains: [],
      departing_trains: [],
      term: '',
      station_found:null
    };

    this.fetchStations = this.fetchStations.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.sortTrains = this.sortTrains.bind(this);
    this.stationCodeToName = this.stationCodeToName.bind(this);
  };

  componentDidMount() {
    this.fetchStations();
  }

  //fetch passenger stations
  fetchStations() {
    axios.get(`${ROOT_URL}/metadata/stations`)
      .then((response) => {
        
        const passenger_stations = _.filter(response.data, { passengerTraffic: true });
        
        this.setState({
          stations: passenger_stations,
          selectedStation: {},
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchTrains(stationShortCode) {
    axios.get(`${ROOT_URL}/live-trains/station/${stationShortCode}?arrived_trains=0&arriving_trains=5&departed_trains=0&departing_trains=5`)
      .then((response) => {

        const trains = response.data;
        this.sortTrains(trains);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sortTrains(trains) {
    let arriving_trains = [];
    let departing_trains = [];

    trains.forEach(t => {
      let arrival_row = _.find(t.timeTableRows, { type: "ARRIVAL", stationShortCode: this.state.selectedStation.stationShortCode });
      let departure_row = _.find(t.timeTableRows, { type: "DEPARTURE", stationShortCode: this.state.selectedStation.stationShortCode });

      /*This way of pickign from and to staions is not always accurate
      *TODO: pick the actual passenger traffic stations
      */

      if(!_.isEmpty(arrival_row)){
        arriving_trains.push({
          'name': `${t.trainType} ${t.trainNumber}`,
          'time': arrival_row.scheduledTime,
          'from': this.stationCodeToName(t.timeTableRows[0].stationShortCode),
          'to': this.stationCodeToName(t.timeTableRows[t.timeTableRows.length - 1].stationShortCode),
          'platform': arrival_row.commercialTrack,
          'cancelled': t.cancelled
        });
      }

      if(!_.isEmpty(departure_row)){
        departing_trains.push({
          'name': `${t.trainType} ${t.trainNumber}`,
          'time': departure_row.scheduledTime,
          'from': this.stationCodeToName(t.timeTableRows[0].stationShortCode),
          'to': this.stationCodeToName(t.timeTableRows[t.timeTableRows.length - 1].stationShortCode),
          'platform': departure_row.commercialTrack,
          'cancelled': t.cancelled
        });
      }
    });

    this.setState({ arriving_trains, departing_trains });
  }

  handleSearchChange(term) {
    this.setState({ term });
  }

  handleSearchSubmit() {

    this.setState({ arriving_trains:[], departing_trains:[],selectedStation: '' });

    const term = this.state.term;

    //find user's station from stations array
    const station = _.find(this.state.stations,
      (o) => { return ( _.isEqual(_.lowerCase(o.stationName), _.lowerCase(term)) 
        || _.isEqual(_.lowerCase(o.stationName), _.lowerCase(`${term} asema`))); });
    

    if (!_.isEmpty(station)) {
      this.setState({ selectedStation: station, term: '', station_found: true });
      this.fetchTrains(station.stationShortCode);
    }
    else{
      this.setState({ station_found: false });
    }
  }

  stationCodeToName(code){
    let station = _.find(this.state.stations,{stationShortCode: code});
    if(_.isEmpty(station)){
      return code; 
    }
    return station.stationName;
  }


  render() {
    return (
      <div className="App">
        <div className="col-12">
          <SearchBar onSubmit={this.handleSearchSubmit} onChange={this.handleSearchChange}
          term={this.state.term} stations={this.state.stations}/>
        </div>
        <div className="col-12">
          <TraisCard selectedStation={this.state.selectedStation} 
          departing={this.state.departing_trains} arriving={this.state.arriving_trains} stationFound={this.state.station_found}/>
        </div>
      </div>
    );
  }
}

export default App;