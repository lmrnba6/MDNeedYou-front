import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import GeoCode from 'google-geocoding';
import { graystyle, nightStyle } from '../../utils/mapStyle'

@connect(store => ({
    businessList: store.businessList.businessList
}))
export default class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 10,
      markers: []
    };

  }

  componentDidMount() {
    this.createNewMap();
  }

  createNewMap() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap();
    google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange())

  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createAllMarkers(business) {

    const businessList = (!business.length) ? [] : business.map(
      (business, index) => {
        var address = business.address.zipCode;
        this.setMarker(address, business.name);
      });
  }

  setMarker(address, name) {
    var _this = this;
    GeoCode.geocode(address, function (err, location) {
      if (err) {
        return;
      } else if (!location) {
        return;
      } else {
        var marker = _this.createMarker(location, name);
        //create an infoWindow
        var infowindow = new google.maps.InfoWindow({
          content: "<div class='InfoWindow'>" + name + "</div>"
        });

        //open and close infoWindow
        _this.state.markers.push(marker);
        marker.addListener('click', function () {
          if (!infowindow.getMap()) {
            infowindow.open(_this.map, marker);
          } else {
            infowindow.close();
          }
        });
        //recenter the map
        _this.map.setCenter(location);
      }
    });

  }

  removeAllmarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }


  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter(),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: graystyle
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      36.591085, 3.085243
    )
  }

  createMarker(location, name) {
    var icon = "../../../styles/img/marker2.png"
    return new google.maps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      title: name
    })
  }


  createInfoWindow(text, marker) {
    let contentString = "<div class='InfoWindow'>" + text + "</div>"
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: marker,
      content: contentString
    })
  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }


  render() {
    const business = this.props.businessList;
    if (business && business.length === 0) {
      this.removeAllmarkers(this.state.markers);
    } else {
      this.removeAllmarkers(this.state.markers);
      const businessList = !business ? [] : this.createAllMarkers(business);
    }


    return (

      <div className="GMap pull-right">
        <div className='GMap-canvas' ref="mapCanvas">
        </div>
      </div>

    )
  }
}
// GMap.propTypes = {
//   business: React.PropTypes.object.isRequired,
// }

// function mapStateToProps(state) {
//   return {
//     business: state.businessAction
//   };
// }

// export default connect(mapStateToProps)(GMap);

var initialCenter = { lng: 48.874809, lat: 2.268586 }

//ReactDOM.render(<GMap initialCenter={initialCenter} />, document.getElementById('container'));


