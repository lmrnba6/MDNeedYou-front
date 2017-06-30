import React from "react"
import { connect } from "react-redux"
import remove from "remove-trailing-separator"
import removeValue from "remove-value"
import categories from '../../utils/categories'
import { filterBusiness } from "../../actions/businessActions";

@connect(store => {
	return {
		business: store.business.business
	};
})
class FilterBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: this.props.city,
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
		this.props.filterBusiness(this.state)
	}

	render() {

		const category = categories.map(
			(doc, index) =>
				<li class="list-group-item">
					<div class="checkbox">
						 <label class="active">
							<input class="hide" onChange={this.setFilter} name={doc} type="checkbox" value="" />
							<i class="fa fa-square-o fa-2x"></i><i class="fa fa-check-square-o fa-2x"></i>
							<span> {doc}</span>
									</label>
					</div>
				</li>
		);

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
						<div id="collapse0" class="panel-collapse collapse out" >
							<ul class="list-group">
								{category}
							</ul>
						</div>

						<div class="panel-heading " >
							<h4 class="panel-title">
								<a data-toggle="collapse" href="#collapse1">
									<i class="indicator fa fa-caret-down" aria-hidden="true"></i> Sex
							</a>
							</h4>
						</div>
						<div id="collapse1" class="panel-collapse collapse out" >
							<ul class="list-group">
								<li class="list-group-item">
									<div class="checkbox">
										<label class="active">
											<input type="checkbox" class="hide" value="" />
											<i class="fa fa-square-o fa-2x"></i><i class="fa fa-check-square-o fa-2x"></i>
											<span> Woman</span>
									</label>
									</div>
								</li>
								<li class="list-group-item">
									<div class="checkbox" >
										<label class="active">
											<input type="checkbox" class="hide" value="" />
											<i class="fa fa-square-o fa-2x"></i><i class="fa fa-check-square-o fa-2x"></i>
											<span> Man</span>
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


