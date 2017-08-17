import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import local from '../../../i18n/i18n';
import createHistory from 'history/createHashHistory';
import { changeLanguage } from '../../actions/businessActions'
import { cities } from '../../utils/cities';


@connect(store => ({
    local: store.local.local
}))
export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    onChange(e) {
        this.setState({ city: e.target.innerText });
        createHistory().push('/businessList/' + e.target.innerText.trim().toLocaleLowerCase())
    }

    render() {

        local.setLanguage(this.props.local.toLowerCase() || 'gb');
        const city = cities.map(
            (c, index) =>
                <li key={index} onClick={this.onChange.bind(this)}>{c}</li>
        );
        return (
            <header>
                <div class="container" id="header">
                    <div class="intro-text">
                        <div class="intro-lead-in">{local.home_find_doctor_title}</div>
                        <div class="intro-heading">{local.home_bookNow}</div>
                        {/*<Link to="/searchHome" class="page-scroll btn btn-xl">{local.home_button_search}</Link>*/}
                        <div class="input-group-btn search-panel">
                            <button type="button" class="btn btn-xl dropdown-toggle" data-toggle="dropdown">
                                <span id="search_concept">Find by city </span> <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu scrollable-menu" role="menu">
                                {city}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

