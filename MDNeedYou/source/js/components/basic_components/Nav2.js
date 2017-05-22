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

            <div id="nav">
                <div class="navbar navbar-inverse navbar-fixed-top" data-spy="affix" data-offset-top="100">
                    <div class="container">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
                            <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#">HTML</a></li>
                                <li><a href="#">CSS</a></li>
                                <li><a href="#">JavaScript</a></li>
                            </ul>
     
                        <a class="navbar-brand" href="#"><img class="img-responsive logo" src="../../styles/icons/logo.png" alt="" /></a>
                    </div>
                    <div id="navbar" class="collapse navbar-collapse">

                        <ul class="nav navbar-nav navbar-right">
                            <li class="active"><a href="#">Home</a>
                            </li>
                            <li><a href="#about">About</a>
                            </li>
                            <li><a href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div >


        );
    }
}

