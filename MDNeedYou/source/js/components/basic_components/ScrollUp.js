import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class Client extends React.Component {
	constructor() {
		super()
	
	}

    scrollUp(){
        window.scrollTo(0, 0)
    }
	render() {

		return (
            <a href="#" onClick= {this.scrollUp} id="scrollUp" title="Go to top"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
            
            
            
		);
	}
}
