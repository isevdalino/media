import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { articleViewContainerStyleSheet } from '../articles/articlesStyles';

export class GoogleMap extends Component {
    render() {
        const articleViewContainerStyle = articleViewContainerStyleSheet();
        return (
            <div style={articleViewContainerStyle}>
                <Map google={this.props.google} zoom={14}>

                    {/* <Marker onClick={this.onMarkerClick}
                    name={'Current location'} /> */}

                    {/* <InfoWindow onClose={this.onInfoWindowClose}>
                </InfoWindow> */}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAkZaoWVK0-90PP4WlPbN90G01k0CX3FQw"),
})(GoogleMap)