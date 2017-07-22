import React from "react"
import { connect } from "react-redux"

import { getBusiness } from "../../actions/businessActions";
import WorkingHours from "./WorkingHours"



@connect(store => ({
    business: store.business.business
}))
export default class BusinessProfile extends React.Component {

	componentWillMount() {
		this.props.dispatch(getBusiness(this.props.match.params.userId));
	}

	render() {
		const business = this.props.business;
		return (
			<WorkingHours name={business}/>

		);
	}
}
