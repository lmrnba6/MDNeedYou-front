import React from "react";
import { connect } from "react-redux";

import asyncRoute from '../async-route';

import { fetchUser } from "../actions/userActions";
import { fetchTweets } from "../actions/tweetsActions";
import fetchBusiness  from "../actions/businessActions";

import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

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
const GMapRoute = asyncRoute(() => import("./basic_components/GMap.js"));
const GPlaceRoute = asyncRoute(() => import("./basic_components/GPlace.js"));



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
          <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contactUs" render={(props) => ( <ContactRoute {...props} name = "riri"/>)} />
          <Route exact path="/businessList/:city" component={BusinessListRoute} />
          <Route exact path="/business-profile/:userId" component={BusinessProfileRoute} />
          <Route exact path="/gplace" component={GPlaceRoute} />
          <Route component={ My404ComponentRoute } />
          </Switch>
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

