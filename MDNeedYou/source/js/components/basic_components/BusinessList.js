import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions";;
import { fetchTweets } from "../../actions/tweetsActions";
import {fetchBusiness}  from "../../actions/businessActions";


import BusinessElement from "./BusinessElement";
import BusinessProfile from "./BusinessProfile";

import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';


@connect(store => {
  return {
    business: store.business.business,
  };
})
export default class BusinessList extends React.Component {
    constructor() {
        super();
        this.list = [];

    }

    componentWillMount() {
        this.props.dispatch(fetchBusiness(this.props.match.params.city));
    }

    render() {

         const business = this.props.business;
        console.log(businessList);
        const businessList = (!business.length) ? [] : business.map(
            (business, index) => <BusinessElement key={index} name={business} />
        );

        return (
            <div>
                <section id="portfolio" class="bg-light-gray">
                    <div class="container">
                        <div class="row">
                            {businessList}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
