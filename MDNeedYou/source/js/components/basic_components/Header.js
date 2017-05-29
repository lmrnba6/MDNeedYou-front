import React from "react";
import { IndexLink, Link } from "react-router-dom";
import SearchExpand from "./SearchExpand";
import GPlace from"./GPlace"


export default class Header extends React.Component {
    constructor() {
        super()

    }


    render() {

        return (
            <header>
                <div class="container">
                    <div class="intro-text">
                        <div class="intro-lead-in">Find Your Doctor or Clinic</div>
                        <div class="intro-heading">Book Now</div>
                        <GPlace />
                        <Link to="/businessList/sherbrooke" class="page-scroll btn btn-xl">Search</Link>
                    </div>
                </div>
            </header>
        );
    }
}
