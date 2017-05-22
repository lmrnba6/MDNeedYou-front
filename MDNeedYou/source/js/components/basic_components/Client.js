import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class Nav extends React.Component {
	constructor() {
		super()
	
	}


	render() {

		return (
  <aside class="clients">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-6">
                    <a href="#">
                        <img src="../../styles/img/logos/envato.jpg" class="img-responsive img-centered" alt=""/>
                    </a>
                </div>
                <div class="col-md-3 col-sm-6">
                    <a href="#">
                        <img src="../../styles/img/logos/designmodo.jpg" class="img-responsive img-centered" alt=""/>
                    </a>
                </div>
                <div class="col-md-3 col-sm-6">
                    <a href="#">
                        <img src="../../styles/img/logos/themeforest.jpg" class="img-responsive img-centered" alt=""/>
                    </a>
                </div>
                <div class="col-md-3 col-sm-6">
                    <a href="#">
                        <img src="../../styles/img/logos/creative-market.jpg" class="img-responsive img-centered" alt=""/>
                    </a>
                </div>
            </div>
        </div>
    </aside>
		);
	}
}
