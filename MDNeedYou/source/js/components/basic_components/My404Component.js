import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class My404Component extends React.Component {
	constructor() {
		super()
	
	}


	render() {

		return (

    <div class="error-template">
        <h1>
            Oops!</h1>
        <h2>
            404 Not Found</h2>
        <div class="error-details">
            Sorry, an error has occured, Requested page not found!
                </div>
        <div class="error-actions">
            <Link to="/" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
                Take Me Home </Link><Link to="/contactUs" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-envelope"></span> Contact Support </Link>
        </div>
    </div>


		);
	}
}
