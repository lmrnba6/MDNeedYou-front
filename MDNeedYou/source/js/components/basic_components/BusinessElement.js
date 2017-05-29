import React from "react";
import { Link } from "react-router-dom";

export default class BusinessElement extends React.Component {
    constructor() {
        super();
    }

    render() {
        const business = this.props.name[0];
        const url = '/business-profile/'+business.businessId;

        return (
            <div class="col-md-4 col-sm-6 portfolio-item">
                <Link to={url} class="portfolio-link" data-toggle="modal">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content">
                            <i class="fa fa-plus fa-3x"></i>
                        </div>
                    </div>
                <img src="../../styles/img/portfolio/roundicons.png" class="img-responsive" alt="" />
                </Link>
                <div class="portfolio-caption">
                    <h4>Round Icons {business.name}</h4>
                    <p class="text-muted">Graphic Design {business.businessId}</p>
                </div>
            </div>
        );
    }
}
