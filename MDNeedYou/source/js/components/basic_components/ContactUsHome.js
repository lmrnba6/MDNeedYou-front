import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import GMapOneMarker from "./GMapOneMarker";


export default class ContactUsHome extends React.Component {
    render() {

        return (
            <div id="contact2">
            <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Contact Us</h2>
                    <br/>
                </div>
                <div class="col-md-8" id="mapContactUs">
                    <GMapOneMarker />
                </div>
                <div class="col-md-4">
                    <ul class="text-center">
                        <li class="wow fadeInUp" data-wow-delay="0.2s"><i class="fa fa-map-marker"></i>
                            <p>SHERBROOKE, QC J1K3A9, Canada</p>
                        </li>

                        <li class="wow fadeInUp" data-wow-delay="0.3s"><i class="fa fa-phone"></i>
                            <p>+1 819 432 6781</p>
                        </li>

                        <li class="wow fadeInUp" data-wow-delay="0.4s"><i class="fa fa-envelope"></i>
                            <p>contact@mdneedyou.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
