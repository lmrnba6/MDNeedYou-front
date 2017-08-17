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
export default class FilterBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: this.props.city,
			filter: [],
			sex: [],
			name:''
		}
		this.setFilter = this.setFilter.bind(this);
	}

	setFilter(e) {
		let filter = {city: this.state.city, filter: this.state.filter, sex: this.state.sex, name:this.state.name};
		if(e.target.name === 'nameFilter'){
			filter.name = e.target.value;
		}
		else if (e.target.checked) {
			if(e.target.name === 'woman' || e.target.name === 'man'){
				filter.sex.push(e.target.name);
			}else{
				filter.filter.push(e.target.name);
			}
		} else {
			filter.filter = removeValue(filter.filter, e.target.name);
			filter.sex = removeValue(filter.sex , e.target.name);
		}
		this.props.dispatch(filterBusiness(filter));
		this.setState({filter: filter.filter, sex: filter.sex, name: filter.name})
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {

		const category = categories.map(
			(doc, index) =>
				<li  key={index} class="list-group-item">
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
									<i class="indicator fa fa-caret-down" aria-hidden="true"></i> Name
							</a>
							</h4>
						</div>
						<div id="collapse0" class="panel-collapse collapse out" >
							<input name="nameFilter" id="searchFilter" onChange={this.setFilter} placeholder="name here..." autoFocus/>
						</div>
						<div class="panel-heading " >
							<h4 class="panel-title">
								<a data-toggle="collapse" href="#collapse1">
									<i class="indicator fa fa-caret-down" aria-hidden="true"></i> Speciality
							</a>
							</h4>
						</div>
						<div id="collapse1" class="panel-collapse collapse out" >
							<ul class="list-group">
								{category}
							</ul>
						</div>

						<div class="panel-heading " >
							<h4 class="panel-title">
								<a data-toggle="collapse" href="#collapse2">
									<i class="indicator fa fa-caret-down" aria-hidden="true"></i> Sex
							</a>
							</h4>
						</div>
						<div id="collapse2" class="panel-collapse collapse out" >
							<ul class="list-group">
								<li class="list-group-item">
									<div class="checkbox">
										<label class="active">
											<input type="checkbox" name="woman" onChange={this.setFilter} class="hide" value="" />
											<i class="fa fa-square-o fa-2x"></i><i class="fa fa-check-square-o fa-2x"></i>
											<span> Woman</span>
									</label>
									</div>
								</li>
								<li class="list-group-item">
									<div class="checkbox" >
										<label class="active">
											<input type="checkbox" name="man" onChange={this.setFilter} class="hide" value="" />
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
// FilterBar.propTypes = {
// 	filterBusiness: React.PropTypes.func.isRequired
// }

// export default connect(null, { filterBusiness })(FilterBar);


