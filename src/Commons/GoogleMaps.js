import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class GoogleMaps extends Component {

    render() { 
        return ( 
            <div>
                <Map
                    google={this.props.google}
                    zoom={18}
                    initialCenter={{ lat: 6.914720098201995, lng: 79.97294449720798}}
                    >
                    <Marker position={{ lat: 6.914720098201995, lng: 79.97294449720798}} />
                </Map>
            </div>
         );
    }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDf4DxmbGtSGlpwMzimt7OaqRAFwAnYJwk'
})(GoogleMaps);