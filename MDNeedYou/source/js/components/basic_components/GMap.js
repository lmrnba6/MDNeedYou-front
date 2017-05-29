import React from "react"
import { render } from "react-dom"

export default class GMap extends React.Component {
  state = { zoom: 10 };

  static propTypes() {
    initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  }

  render() {
    return(

      <div className="GMap pull-right">
        <div className='GMap-canvas' ref="mapCanvas">
        </div>
      </div>

    )}

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()
    this.marker = this.createMarker()
    this.infoWindow = this.createInfoWindow()

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      48.874809, 2.268586
    )
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map
    })
  }

  createInfoWindow() {
    let contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: this.marker,
      content: contentString
    })
  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }
}

var initialCenter = { lng: -90.1056957, lat: 29.9717272 }

//ReactDOM.render(<GMap initialCenter={initialCenter} />, document.getElementById('container'));


