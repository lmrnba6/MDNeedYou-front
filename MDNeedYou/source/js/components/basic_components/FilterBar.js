import React from "react"
import { connect } from "react-redux"
import remove from "remove-trailing-separator"
import removeValue from "remove-value"

import { fetchBusiness, filterBusiness } from "../../actions/businessActions";

@connect(store => {
    return {
        business: store.business.business
    };
})
class FilterBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: []
		}
		this.setFilter = this.setFilter.bind(this);
	}

	setFilter(e) {

		var arr = this.state.filter;
		if (e.target.checked) {
			arr.push(e.target.name);
			this.setState({ filter: arr })
		} else {
			arr = removeValue(arr, e.target.name);
			this.setState({ filter: arr });
		}
		this.props.filterBusiness(arr,this.props.business)
	}

	render() {


		return (

			<div class="col-md-12 filterBar">
				<div id="accordion" class="panel panel-primary behclick-panel">
					<div class="panel-heading">
						<h3 class="panel-title">Search Filter</h3>
					</div>
					<div class="panel-body" >
						<div class="panel-heading " >
							<h4 class="panel-title">
								<a data-toggle="collapse" href="#collapse0">
									<i class="indicator fa fa-caret-down" aria-hidden="true"></i> Speciality
							</a>
							</h4>
						</div>
						<div id="collapse0" class="panel-collapse collapse in" >
							<ul class="list-group">
								<li class="list-group-item">
									<div class="checkbox">
										<label>
											<input onChange={this.setFilter} name='dentist' type="checkbox" value="" />
											Dentist
									</label>
									</div>
								</li>
								<li class="list-group-item">
									<div class="checkbox" >
										<label>
											<input onChange={this.setFilter} name='audiological' type="checkbox" value="" />
											Audiological Medicine
									</label>
									</div>
								</li>
								<li class="list-group-item">
									<div class="checkbox"  >
										<label>
											<input onChange={this.setFilter} name='cardiology' type="checkbox" value="" />
											Cardiology
									</label>
									</div>
								</li>
								<li class="list-group-item">
									<div class="checkbox"  >
										<label>
											<input type="checkbox" value="" />
											Allergy
									</label>
									</div>
								</li>
							</ul>
						</div>

						<div class="panel-heading " >
							<h4 class="panel-title">
								<a data-toggle="collapse" href="#collapse1">
									<i class="indicator fa fa-caret-down" aria-hidden="true"></i> Distance
							</a>
							</h4>
						</div>
						<div id="collapse1" class="panel-collapse collapse in" >
							<ul class="list-group">
								<li class="list-group-item">
									<div class="checkbox">
										<label>
											<input type="checkbox" value="" />
											0 - 50 miles
									</label>
									</div>
								</li>
								<li class="list-group-item">
									<div class="checkbox" >
										<label>
											<input type="checkbox" value="" />
											50 - 100 miles
									</label>
									</div>
								</li>
								<li class="list-group-item">
									<div class="checkbox"  >
										<label>
											<input type="checkbox" value="" />
											100 - 200 miles
									</label>
									</div>
								</li>
								<li class="list-group-item">
									<div class="checkbox"  >
										<label>
											<input type="checkbox" value="" />
											All in the city
									</label>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
FilterBar.propTypes = {
	filterBusiness: React.PropTypes.func.isRequired
}

export default connect(null, { filterBusiness })(FilterBar);