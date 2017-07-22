import React from "react"
import { render } from "react-dom"
import GeoCode from 'google-geocoding';
import { graystyle, nightStyle } from '../../utils/mapStyle'


export default class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { zoom: 10 };
  }

  componentDidMount() {

    this.map = this.createMap();
    var icon = "../../../styles/img/marker.jpg"
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(45.412911, -71.882129),
      icon: icon,
    });
    marker.setMap(this.map);
    google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: new google.maps.LatLng(45.412911, -71.882129),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: nightStyle
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  render() {

    return (

      <div className="GMap">
        <div className='GMap-canvas' ref="mapCanvas">
        </div>
      </div>

    )
  }
}




