import React from "react"
import { connect } from "react-redux"
import { IndexLink, Link } from "react-router-dom";
import { getBusiness } from "../../actions/businessActions";
import GMapOneMarker from "./GMapOneMarker";
import ScrollUp from "./ScrollUp";

import asyncRoute from '../../async-route';

const AppointmentRoute = asyncRoute(() => import("./Appointment"));
const AboutRoute = asyncRoute(() => import("./About.js"));
const ClientRoute = asyncRoute(() => import("./Client.js"));
const PortfolioRoute = asyncRoute(() => import("./Portfolio.js"));
const ServiceRoute = asyncRoute(() => import("./Service.js"));
const TeamRoute = asyncRoute(() => import("./Team.js"));
const HeaderRoute = asyncRoute(() => import("./Header.js"));
const GMapRoute = asyncRoute(() => import("./GMap.js"));


@connect(store => {
	return {
		business: store.business.business,
	};
})
export default class BusinessProfile extends React.Component {
	constructor() {
		super();

	}
	componentWillMount() {
		this.props.dispatch(getBusiness(this.props.match.params.userId));
	}

	render() {
		const business = this.props.business;
		const param = this.props.match.params;
		debugger
		const image = "../../../styles/img/header2.jpg";
		return (


			<div>
				<HeaderRoute />
				<ServiceRoute />
				<AboutRoute />
				<TeamRoute />
				<ClientRoute />
				<AppointmenttRoute />
				<ScrollUp />
			</div>

		);
	}
}
