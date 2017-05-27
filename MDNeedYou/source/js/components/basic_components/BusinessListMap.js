import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions";;
import { fetchTweets } from "../../actions/tweetsActions";
import { fetchBusiness } from "../../actions/businessActions";
import GMap from "./GoogleMap";

import BusinessElement from "./BusinessElement";

import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';

@connect(store => {
    return {
        business: store.business.business,
    };
})
export default class BusinessListMap extends React.Component {
    constructor() {
        super()

    }

    componentWillMount() {
        this.props.dispatch(fetchBusiness());
    }


    render() {
        const business = this.props.business;
     
        const businessList = (!business || !business.length) ? [] : business.map(
            (business,index) => <BusinessElement key={index} name={business} />
        );

        return (
            <Router>
                <Route exact path="/businessListMap" render={() => (
                    <section id="portfolio" class="bg-light-gray">
                        <div class="container">
                            <div class="row">                             
                                <GMap />
                                </div>
                            </div>                     
                    </section>
                )} />
            </Router>
        );
    }
}