import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class Service extends React.Component {
	constructor() {
		super()
	
	}


	render() {

		return (
<section id="services">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Services</h2>
                    <h3 class="section-subheading text-muted">Here is our sevices.</h3>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-md-4">
                    <span class="fa-stack fa-4x">
                        <i class="fa fa-circle fa-stack-2x text-primary"></i>
                        <i class="fa fa-book fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 class="service-heading">Appointment</h4>
                    <p class="text-muted">Book your appointment from your nearby doctor.</p>
                </div>
                <div class="col-md-4">
                    <span class="fa-stack fa-4x">
                        <i class="fa fa-circle fa-stack-2x text-primary"></i>
                        <i class="fa fa-stethoscope fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 class="service-heading">Doctor's Advice</h4>
                    <p class="text-muted">Ask you doctor a question.</p>
                </div>
                <div class="col-md-4">
                    <span class="fa-stack fa-4x">
                        <i class="fa fa-circle fa-stack-2x text-primary"></i>
                        <i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 class="service-heading">Nearby Doctors</h4>
                    <p class="text-muted">Find you nearby doctors.</p>
                </div>
            </div>
        </div>
    </section>
		);
	}
}
