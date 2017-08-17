import React from "react";
import { connect } from "react-redux"

import GMap from "./GMap"
import Appointment from "./Appointment"

@connect(store => ({
	business: store.business.business,
}))
export default class WorkingHours extends React.Component {
    constructor() {
        super()

    }


    render() {
            
            const workingDays = !this.props.business.availability ? [] : this.props.business.availability.days.map(
			(days, index) =>
                <li>{days.day} <span class="pull-right">{!days.working ? 'Closed' : days.opening+'-'+days.closing}</span></li>
            )

        return (
            <section id="workingHoursBody">
            <div class="container workingHours">
                <div class="row">
                    <div class="col-sm-8">
                    <Appointment name={this.props.name}/>
                    </div>

                    <div class="col-sm-4">
                        <div class="business-hours">
                            <h2 class="title">Opening Hours</h2>
                            <ul class="list-unstyled opening-hours">
                               {workingDays}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        );
    }
}
