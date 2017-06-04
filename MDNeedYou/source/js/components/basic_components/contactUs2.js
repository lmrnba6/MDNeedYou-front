import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import GMapOneMarker from "./GMapOneMarker";


export default class SimpleForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            address: '',
            result: '',
            country: '',
            redirect: false,
            placeholder:"Where are you...."
        };
       
    }

   

  
    render() {

     
        return (
<div  id="contact2">
<div class="col-md-8" id="mapContactUs">
<GMapOneMarker />
</div>
<div class="col-md-4">
    <ul class="text-center">
        <li class="wow fadeInUp" data-wow-delay="0.2s"><i class="fa fa-map-marker"></i>
            <p>New York, NY 10012, USA</p>
        </li>

        <li class="wow fadeInUp" data-wow-delay="0.3s"><i class="fa fa-phone"></i>
            <p>+ 01 234 567 89</p>
        </li>

        <li class="wow fadeInUp" data-wow-delay="0.4s"><i class="fa fa-envelope"></i>
            <p>contact@mdbootstrap.com</p>
        </li>
    </ul>
</div>
</div>
        )
    }
}
