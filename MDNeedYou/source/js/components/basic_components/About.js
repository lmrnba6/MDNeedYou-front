import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class About extends React.Component {
	constructor() {
		super()
	
	}


	render() {

		return (
 <section id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">About</h2>
                    <h3 class="section-subheading text-muted">Here is the time line of MDNeedYou.</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-image">
                                <img class="img-circle img-responsive" src="../../styles/img/about/quick-start-button.png" alt=""/>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4>APRIL 2017</h4>
                                    <h4 class="subheading">My First step</h4>
                                </div>
                                <div class="timeline-body">
                                    <p class="text-muted">I started my self first to learn the technologies that MDNeedYou needs to be buils (ReactJS, SpringBoot,....)</p>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-image">
                                <img class="img-circle img-responsive" src="../../styles/img/about/born.jpg" alt=""/>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4>Mai 2017</h4>
                                    <h4 class="subheading">MDNeedYou is Born</h4>
                                </div>
                                <div class="timeline-body">
                                    <p class="text-muted">Started MDNeedYou from scratch. I created the back-end part first with a relational database, then I started to develope the front-end with react</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-image">
                                <img class="img-circle img-responsive" src="../../styles/img/about/50-percent.png" alt=""/>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4>JUIN 2017</h4>
                                    <h4 class="subheading">50% of MDNeedYou is done</h4>
                                </div>
                                <div class="timeline-body">
                                    <p class="text-muted">It was so exiting when saw MDNeedYou reach the 50% of its acheivement</p>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-image">
                                <img class="img-circle img-responsive" src="../../styles/img/about/2.jpg" alt=""/>
                            </div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                    <h4>July 2017</h4>
                                    <h4 class="subheading">Mostly Done!</h4>
                                </div>
                                <div class="timeline-body">
                                    <p class="text-muted">I reached 70% but I had to prepare a report and a presentatoin, so I will keep working on it after school for sure</p>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-image">
                                <h4>Be Part
                                    <br/>Of My
                                    <br/>Story!</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
		);
	}
}
