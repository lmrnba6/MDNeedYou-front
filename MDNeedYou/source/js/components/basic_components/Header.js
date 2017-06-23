import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import local from '../../../i18n/i18n';

import { changeLanguage } from '../../actions/businessActions'

@connect(store => ({
    local: store.local.local
}))
export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        local.setLanguage(this.props.local.toLowerCase() || 'gb');
        return (
            <header>
                <div class="container" id="header">
                    <div class="intro-text">
                        <div class="intro-lead-in">{local.home_find_doctor_title}</div>
                        <div class="intro-heading">{local.home_bookNow}</div>
                        <Link to="/searchHome" class="page-scroll btn btn-xl">{local.home_button_search}</Link>
                    </div>
                </div>
            </header>
        );
    }
}

