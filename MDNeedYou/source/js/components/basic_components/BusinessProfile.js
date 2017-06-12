import React from "react"
import { connect } from "react-redux"
import { IndexLink, Link } from "react-router-dom";

import { getBusiness } from "../../actions/businessActions";

import ContactUs from "./ContactUs2";
import HeaderProfile from "./HeaderProfile";
import WorkingHours from "./WorkingHours"



@connect(store => {
	return {
		business: store.business.business,
	};
})
export default class BusinessProfile extends React.Component {
	constructor(props) {
		super(props);

	}
	componentWillMount() {
		this.props.dispatch(getBusiness(this.props.match.params.userId));
	}

	render() {
		const business = this.props.business;
		const param = this.props.match.params;
		return (
			!business ? '':
			<WorkingHours name={business}/>

		);
	}
}
