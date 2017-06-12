import React from "react";
import { IndexLink, Link } from "react-router-dom";
import SearchExpand from "./SearchExpand";
import GPlace from"./GPlace"


export default class HeaderProfile extends React.Component {
    constructor() {
        super()

    }


    render() {

        return (
            <section id="headerProfile">
                    <div class="intro-text">
                        <div class="intro-lead-in">Find Your Doctor or Clinic</div>
                        <div class="intro-heading">Book Now</div>
                        <Link to="/searchHome" class="page-scroll btn btn-xl">Search</Link>
                </div>
            </section>
        );
    }
}
