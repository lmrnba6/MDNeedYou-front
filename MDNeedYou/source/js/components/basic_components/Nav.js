import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from '../../actions/businessActions'
import LanguageBtn from './LanguageBtn'
import ReactFlagsSelect from 'react-flags-select';
import PropTypes from 'prop-types';
import 'react-flags-select/css/react-flags-select.css';

import {changeLanguage} from '../../actions/businessActions'

@connect(store => ({
    business: store.business.business
}))
class Nav extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			collapsed: true,
		};
		

	}

	logout(e) {
		//e.preventDefault();
		this.props.logout();
	}

	toggleCollapse() {
		const collapsed = !this.state.collapsed;
		this.setState({ collapsed });
	}

	onSelectFlag(countryCode){
        this.props.dispatch(changeLanguage(countryCode))
    }

	render() {
		const { collapsed } = this.state;
		const navClass = collapsed ? "collapse" : "";
		const { isAuthenticated } = this.props.auth;
		const url = "/owner-profile/"+ this.props.business.businessId
		const userLinks = (
			
			<ul class="nav navbar-nav">
			<li>
				<Link to={url} class="page-scroll btn btn-lg btn-primary" >Hi {this.props.business.name}</Link>
			</li>
			<li>
				<a href="#" class="page-scroll" onClick={this.logout.bind(this)} >Logout</a>
			</li>
			</ul>
			
			
		);

		const guestLinks = (
			<li>
				<Link to="/login" class="page-scroll" >Login</Link>
			</li>
		);


		return (

			<nav id="mainNav" class="navbar navbar-default navbar-custom navbar-fixed-top" data-spy="affix" data-offset-top="51">
				<div class="container">

					<div class="navbar-header page-scroll">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
						</button>
						<img class="img-responsive pull-left" src="../../../styles/img/logo2.png" alt="" />
						<Link class="navbar-brand page-scroll" to="/">MDNeedYou</Link>
					</div>

					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav navbar-right">
							<li>
								<Link to="service">Services</Link>
							</li>
							<li>
								<Link to="about">About</Link>
							</li>
							<li>
								<Link to="/team">Team</Link>
							</li>
							<li>
								<Link to="/contactUs">Contact</Link>
							</li>
							{isAuthenticated ? userLinks : guestLinks}
							<li>
								 <ReactFlagsSelect    
								 defaultCountry="GB"  
								 countries={["GB", "FR", "DZ"]} 
								 showSelectedLabel={false}
							    showOptionLabel={false}
								selectedSize={25}
								optionsSize={25}
								onSelect={this.onSelectFlag.bind(this)}/> 
							</li>
						</ul>
					</div>

				</div>
			</nav>

		);
	}
}
Nav.propTypes = {
	auth: PropTypes.object,
	logout: PropTypes.func
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, { logout })(Nav);
