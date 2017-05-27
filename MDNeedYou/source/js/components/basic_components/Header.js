import React from "react";
import { IndexLink, Link } from "react-router-dom";
import SearchExpand from "./SearchExpand";


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
                        <Link to="/businessList" class="page-scroll btn btn-xl">Search</Link>
                    </div>
                </div>
            </header>
        );
    }
}
