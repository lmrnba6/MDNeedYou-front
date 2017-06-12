import React from "react";
import { IndexLink, Link } from "react-router-dom";
import Appointment from "./Appointment"


export default class WorkingHours extends React.Component {
    constructor() {
        super()

    }


    render() {

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
                                <li>Sunday <span class="pull-right">Closed</span></li>
                                <li>Monday <span class="pull-right">9:00-22:00</span></li>
                                <li>Tuesday <span class="pull-right">9:00-22:00</span></li>
                                <li>Wednesday <span class="pull-right">9:00-22:00</span></li>
                                <li>Thursday <span class="pull-right">9:00-22:00</span></li>
                                <li>Friday <span class="pull-right">9:00-23:30</span></li>
                                <li>Saturday <span class="pull-right">14:00-23:30</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        );
    }
}
