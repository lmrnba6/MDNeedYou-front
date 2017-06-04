import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import GeoCode from 'google-geocoding';


@connect(store => {
    return {
        business: store.business.business,
    };
})
export default class GMap extends React.Component {
  constructor(props) {
        super(props);
        this.state = { zoom: 10 };
    }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    // const business = this.props.business;
    // var address;
    this.map = this.createMap();
    //this.marker = this.setMarker(location);
    //this.infoWindow = this.createInfoWindow()

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  

  setMarker(address,name){
        var _this = this;
        GeoCode.geocode(address, function(err, location) {
        if( err ) {
            return;
        } else if( !location ) {
            return;
        } else {
           var marker =  _this.createMarker(location,name);

           //create an infoWindow
           var infowindow = new google.maps.InfoWindow({
          content: "<div class='InfoWindow'>"+name+"</div>"
        });

        //open and close infoWindow
           marker.addListener('click', function() {
             if(!infowindow.getMap()){
                infowindow.open(_this.map, marker);
             }else{
               infowindow.close();
             }
        });
        //recenter the map
           _this.map.setCenter(location);
        }
    });

  }


  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter(),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: mapstyle
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      36.591085, 3.085243
    )
  }

  createMarker(location, name) {
    var icon = "../../../styles/img/32-icon-topicalert-health.jpg"
    return new google.maps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      title: name
    })
  }

  
  createInfoWindow(text,marker) {
    let contentString = "<div class='InfoWindow'>"+text+"</div>"
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
  const business = this.props.business;
  const businessList = !business ? [] : this.setMarker(business.address, business.name);

    return(

      <div className="GMap pull-right">
        <div className='GMap-canvas' ref="mapCanvas">
        </div>
      </div>

    )}
}

var initialCenter = { lng: 48.874809,  lat:  2.268586 }

//ReactDOM.render(<GMap initialCenter={initialCenter} />, document.getElementById('container'));

var mapstyle=
  [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]
