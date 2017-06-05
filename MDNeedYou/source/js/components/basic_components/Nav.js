import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from '../../actions/businessActions'


class Nav extends React.Component {

	constructor() {
		super();


		this.state = {
			collapsed: true,
		};

	}

	logout(e) {
		e.preventDefault();
		this.props.logout();
	}

	toggleCollapse() {
		const collapsed = !this.state.collapsed;
		this.setState({ collapsed });
	}

	render() {

		const { collapsed } = this.state;
		const navClass = collapsed ? "collapse" : "";
		const { isAuthenticated } = this.props.auth;
		const userLinks = (

			<li>
				<a href="#" class="page-scroll" onClick={this.logout.bind(this)} >Logout</a>
			</li>
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
								<a class="page-scroll" href="#">Services</a>
							</li>
							<li>
								<a class="page-scroll" href="#">Portfolio</a>
							</li>
							<li>
								<Link class="page-scroll" to="/businessList">About</Link>
							</li>
							<li>
								<Link class="page-scroll" to="/gplace">Team</Link>
							</li>
							<li>
								<Link to="/contactUs" class="page-scroll" >Contact</Link>
							</li>
							{isAuthenticated ? userLinks : guestLinks}

						</ul>
					</div>

				</div>
			</nav>

		);
	}
}
Nav.propTypes = {
	auth: React.PropTypes.object.isRequired,
	logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, { logout })(Nav);
