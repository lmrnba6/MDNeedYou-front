import React from "react"
import { connect } from "react-redux"
import { IndexLink, Link } from "react-router-dom";
import { getBusiness } from "../../actions/businessActions";
import GMapOneMarker from "../basic_components/GMapOneMarker";

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


			<div class="profile container">
				<div class="col-md-3" id="side">
					<br />
					<div class="list-group">
						<a href="" class="list-group-item active">Home</a>
						<a href="#" class="list-group-item">Help</a>
					</div>
					<div id="map-profile">
						<GMapOneMarker />
					</div>
				</div>
				<div class="col-md-9">
					<div class="thumbnail">
						<div class="imgDiv col-md-12">
							<img src={image} class="img-rounded" alt="Cinque Terre" width="100%" height="236" />
						</div>

						<div class="caption-full">
							<h4>
								<a href="#"></a>
							</h4>
							<p></p>

							<p>
								Home delivery <span class="glyphicon glyphicon-remove"></span>
							</p>

							<p>Phone:{business.name} </p>
							<p>Address: </p>

							<p>
								Home delivery <span class="glyphicon glyphicon-remove"></span>
							</p>

							<p>Description: </p>

						</div>
					</div>
				</div>
			</div>

		);
	}
}
