import React from "react";
import { IndexLink, Link } from "react-router-dom";

import ScrollUp from "./ScrollUp";
import Header from "./Header";
import Service from "./Service";
import ContactUsHome from "./ContactUsHome";

export default class Home extends React.Component {
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

componentWillMount(){
    debugger
   this.scrollUp();
}

    render() {

        return (
            <div>
                <Header />
                <Service />
                <ContactUsHome />
                <ScrollUp />
            </div>
        );
    }
}
