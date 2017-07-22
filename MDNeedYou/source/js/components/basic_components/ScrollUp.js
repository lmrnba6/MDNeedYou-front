import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class Client extends React.Component {
	constructor() {
		super()
	
	}

	scrollUp() {
		window.scrollTo(
			2500,
			0,
			'smooth'
		);
    }
	render() {

		return (
            <span href="#" onClick= {this.scrollUp.bind(this)} id="scrollUp" title="Go to top"><i class="fa fa-arrow-up" aria-hidden="true"></i></span>
		);
	}
}
