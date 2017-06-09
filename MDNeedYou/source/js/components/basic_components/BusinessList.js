import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions";;
import { fetchTweets } from "../../actions/tweetsActions";
import { fetchBusiness, filterBusiness } from "../../actions/businessActions";


import BusinessElement from "./BusinessElement";
import BusinessProfile from "./BusinessProfile";
import FilterBar from "./FilterBar";
import GPlace from "./GPlace";
import GMap from "./GMap";

import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';


@connect(store => {
    return {
        business: store.business.business
    };
})
export default class BusinessList extends React.Component {
    constructor() {
        super();
        this.state={
            mapCollapse: false,
            collapseText: "hide map",
            mapFaCaret : "fa-caret-up",
        }
        this.showHideMap= this.showHideMap.bind(this);
        this.list = [];

    }

    componentWillMount() {
        this.props.dispatch(fetchBusiness(this.props.match.params.city));
    }

    showHideMap(){
        const collapse = !this.state.mapCollapse;
        const text = this.state.mapCollapse ? "hide map" : "show map";
        const caret = this.state.mapCollapse ? "fa-caret-down": "fa-caret-up"
        this.setState({collapseText:text, mapCollapse:collapse, mapFaCaret:caret});
    }


    render() {
        const caretMap = "indicator fa "+this.state.mapFaCaret;
        const business = this.props.business ;
        const businessList = (!business.length) ? [] : business.map(
            (business, index) => <BusinessElement key={index} name={business} />
        );
        const map = <GMap name='false'/>

        return (
            <div class="businessList">
                <section id="portfolio" class="bg-light-gray">
                    <div class="container">
                        <div id="accordion" class="panel panel-primary behclick-panel">
                            <div class="panel-body" >
                                <div class="panel-heading " >
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" onClick={this.showHideMap} href="#collapseMap">
                                            <i class={caretMap} aria-hidden="true"></i> {this.state.collapseText}
							</a>
                                    </h4>
                                </div>
                                <div id="collapseMap" class="panel-collapse collapse in" >
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <div>
                                                {map}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <FilterBar city={this.props.match.params.city} />
                            </div>
                            <div class="col-md-9">
                                {businessList}
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
