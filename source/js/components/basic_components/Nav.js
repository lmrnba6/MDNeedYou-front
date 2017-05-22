import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class Nav extends React.Component {
	constructor() {
		super()
		this.state = {
			collapsed: true,
		};
	}

	toggleCollapse() {
		const collapsed = !this.state.collapsed;
		this.setState({ collapsed });
	}

	render() {
		const { collapsed } = this.state;
		const navClass = collapsed ? "collapse" : "";

		return (

			<nav id="mainNav" class="navbar navbar-default navbar-custom navbar-fixed-top" data-spy="affix" data-offset-top="51">
				<div class="container">

					<div class="navbar-header page-scroll">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
						</button>
						<a class="navbar-brand page-scroll" href="#page-top">MDNeedYou</a>
					</div>

					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav navbar-right">
							<li class="hidden">
								<a href="#page-top"></a>
							</li>
							<li>
								<a class="page-scroll" href="#services">Services</a>
							</li>
							<li>
								<a class="page-scroll" href="#portfolio">Portfolio</a>
							</li>
							<li>
								<a class="page-scroll" href="#about">About</a>
							</li>
							<li>
								<a class="page-scroll" href="#team">Team</a>
							</li>
							<li>
								<a class="page-scroll" href="#contact">Contact</a>
							</li>
						</ul>
					</div>

				</div>

			</nav>

		);
	}
}
