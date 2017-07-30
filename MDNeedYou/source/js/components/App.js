import React from "react";

import asyncRoute from '../async-route';
import { createStore, combineReducers } from 'redux'
import fetchBusiness  from "../actions/businessActions";

import requireAuth from '../utils/requireAuth';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const HomeRoute = asyncRoute(() => import("./basic_components/Home"));
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
const SearchHomeRoute = asyncRoute(() => import("./basic_components/SearchHome.js"));
const LoginRoute = asyncRoute(() => import("./basic_components/Login.js"));
const OwnerProfileRoute = asyncRoute(() => import("./basic_components/OwnerProfile.js"));

import reducers from '../reducers';


export default class App extends React.Component {


  render() {
    return (
      <Router>
        <div>
          <NavRoute />
          <Switch>
          <Route exact path="/" component={HomeRoute} />
          <Route exact path="/about" component={AboutRoute} />
          <Route exact path="/service" component={ServiceRoute} />
          <Route exact path="/team" component={TeamRoute} />
          <Route exact path="/contactUs" render={(props) => ( <ContactRoute {...props} name = "riri"/>)} />
          <Route exact path="/searchHome" component={SearchHomeRoute} />
          {/*<Route exact path="/owner-profile/:bId" component={requireAuth(OwnerProfileRoute)} />*/}
          <Route exact path="/owner-profile/:bId" component={OwnerProfileRoute} />
          <Route exact path="/businessList/:city" component={BusinessListRoute} />
          <Route exact path="/business-profile/:userId" component={BusinessProfileRoute}/>
          <Route exact path="/gplace" component={GPlaceRoute} />
          <Route exact path="/login**" component={LoginRoute} />
          <Route component={ My404ComponentRoute } />
          </Switch>
          <FooterRoute />
        </div>
      </Router>
    );
  }

}


