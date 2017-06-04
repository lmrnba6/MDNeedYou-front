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
            <div class="searchHome">
                <div class="container">
                    <div class="intro-text">
                        <div class="intro-lead-in">Find Your Doctor or Clinic</div>
                        <GPlace />
                    </div>
                </div>
            </div>
        );
    }
}
