import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class GoogleMap extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBgb_Oigx46cGe59I2iH4FvJZKDLaiijlg"),
})(GoogleMap)