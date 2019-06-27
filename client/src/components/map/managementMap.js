import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import logoImage from '../management-images/logo.png';

class ManagementMap extends Component {



  render() { 

    const myIcon = L.icon({
      iconUrl: logoImage,
      iconSize: [25, 31],
      iconAnchor: [0, 0],
      popupAnchor: [12, 10]
    }); 
        

  return (
    (this.props.getAddress) ?

      <Map className="map" center={[this.props.getAddress.lat, this.props.getAddress.lng]} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[this.props.getAddress.lat, this.props.getAddress.lng]} icon={myIcon} >
          <Popup>
            <div className="map-popup">
              <h6>ROOM DESC COMPANY</h6>
              <p>{this.props.getAddress.street}</p>
              <p>{this.props.getAddress.zip} {this.props.getAddress.city}</p>
              <p>{this.props.getAddress.land}</p>
            </div>
          </Popup>
        </Marker>

      </Map>
      :
      <p>Loading</p>
    );
  }
}


export default ManagementMap;