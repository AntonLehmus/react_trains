import React, { Component } from 'react';


export default class Loading extends Component {
    render() {
      return (
        <div className="row justify-content-center">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
         </div>
      );
    }
}