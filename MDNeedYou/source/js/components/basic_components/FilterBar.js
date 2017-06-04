import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions";;
import { fetchTweets } from "../../actions/tweetsActions";
import {fetchBusiness}  from "../../actions/businessActions";


import BusinessElement from "./BusinessElement";
import BusinessProfile from "./BusinessProfile";

import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';


@connect(store => {
  return {
    business: store.business.business,
  };
})
export default class BusinessList extends React.Component {
    constructor() {
        super();
        this.list = [];

    }

    componentWillMount() {
       // this.props.dispatch(fetchBusiness(this.props.match.params.city));
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
										<input type="checkbox" value=""/>
										Dentist
									</label>
								</div>
							</li>
							<li class="list-group-item">
								<div class="checkbox" >
									<label>
										<input type="checkbox" value=""/>
										Audiological Medicine 
									</label>
								</div>
							</li>
							<li class="list-group-item">
								<div class="checkbox"  >
									<label>
										<input type="checkbox" value=""/>
										Cardiology  
									</label>
								</div>
							</li>
							<li class="list-group-item">
								<div class="checkbox"  >
									<label>
										<input type="checkbox" value=""/>
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
										<input type="checkbox" value=""/>
										0 - 50 miles
									</label>
								</div>
							</li>
							<li class="list-group-item">
								<div class="checkbox" >
									<label>
										<input type="checkbox" value=""/>
										50 - 100 miles
									</label>
								</div>
							</li>
							<li class="list-group-item">
								<div class="checkbox"  >
									<label>
										<input type="checkbox" value=""/>
										100 - 200 miles
									</label>
								</div>
							</li>
							<li class="list-group-item">
								<div class="checkbox"  >
									<label>
										<input type="checkbox" value=""/>
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
