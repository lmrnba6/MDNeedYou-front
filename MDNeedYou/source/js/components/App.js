import React from "react";
import { connect } from "react-redux";

import asyncRoute from '../async-route';

import { fetchUser } from "../actions/userActions";
import { fetchTweets } from "../actions/tweetsActions";
import fetchBusiness  from "../actions/businessActions";

import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const ContactRoute = asyncRoute(() => import("./basic_components/ContactUs"));
const BusinessProfileRoute = asyncRoute(() => import("./basic_components/BusinessProfile"));
const BusinessListRoute = asyncRoute(() => import("./basic_components/BusinessList.js"));
const AboutRoute = asyncRoute(() => import("./basic_components/About.js"));
const ClientRoute = asyncRoute(() => import("./basic_components/Client.js"));
const FooterRoute = asyncRoute(() => import("./basic_components/Footer.js"));
const NavRoute = asyncRoute(() => import("./basic_components/Nav.js"));
const PortfolioRoute = asyncRoute(() => import("./basic_components/Portfolio.js"));
const ServiceRoute = asyncRoute(() => import("./basic_components/Service.js"));
const TeamRoute = asyncRoute(() => import("./basic_components/Team.js"));
const HeaderRoute = asyncRoute(() => import("./basic_components/Header.js"));
const My404ComponentRoute = asyncRoute(() => import("./basic_components/My404Component.js"));
const BusinessElementRoute = asyncRoute(() => import("./basic_components/BusinessElement.js"));



@connect(store => {
  return {
    business: store.business.business,
  };
})
export default class App extends React.Component {

  componentWillMount() {
    //this.props.dispatch(fetchBusiness());
  }

  render() {

    return (
      <Router>
        <div>
          <NavRoute />
          <Route exact path="/" component={Home} />
          <Route exact path="/contactUs" render={() => ( <ContactRoute name = "riri"/>)} />
          <Route exact path="/businessList" component={BusinessListRoute} />
          <Route exact path="/business-profile/:userId" component={BusinessProfileRoute} />
          <FooterRoute />
        </div>
      </Router>
    );
  }

}

const Home = () => (
  <div>
    <HeaderRoute />
    <ServiceRoute />
    <AboutRoute />
    <TeamRoute />
    <ClientRoute />
    <ContactRoute />
  </div>
);

