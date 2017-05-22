import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class Nav extends React.Component {
    constructor() {
        super()

    }


    render() {

        return (
            <header>
                <div class="container">
                    <div class="intro-text">
                        <div class="intro-lead-in">Welcome To Our Studio!</div>
                        <div class="intro-heading">It's Nice To Meet You</div>
                        <a href="#services" class="page-scroll btn btn-xl">Tell Me More</a>
                    </div>
                </div>
            </header>
        );
    }
}
