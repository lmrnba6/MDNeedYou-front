import React from "react";
import { Link } from "react-router-dom";

export default class BusinessElement extends React.Component {
    constructor() {
        super();
    }

    render() {
        const business = this.props.name;
        const url = '/business-profile/'+business.businessId;

        return (
            <div class="col-md-4 col-sm-6 portfolio-item">
                <Link to={url} class="portfolio-link" data-toggle="modal">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content">
                            <h4>Book now</h4>
                            <br/>
                            <i class="fa fa-ambulance fa-3x" aria-hidden="true"></i>
                        </div>
                    </div>
                    {business.photo==null || business.photo=='' ?
                         <img src={"../../../styles/img/noimagefound.jpg"} class="img-responsive" alt="" />:
                         <img src={business.photo} class="img-responsive" alt="" /> 
                    }
                </Link>
                <div class="portfolio-caption">
                    <h4>Doctor {business.name}</h4>
                    <p class="text-muted">{business.category.name}</p>
                    <p class="text-muted">{business.address.streetNumber} {business.address.streetName}</p>
                </div>
            </div>
        );
    }
}
