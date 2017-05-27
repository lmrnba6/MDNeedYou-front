import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class BusinessProfile extends React.Component {
    constructor() {
        super()

    }
    render() {
        const param = this.props.match.params;
        const image = "../../../styles/img/header2.jpg";
        return (


	<div class="profile">
	<div class="col-md-3" id="side">
                <br/>
                <div class="list-group">
               		 <a href="" class="list-group-item active">Home</a>       
                    <a href="#" class="list-group-item">Help</a>
                </div>
            </div>

        <div class="container-fluid">
		<div class="row">
			<div class="col-md-9">
				<div class="thumbnail">
					<div class="imgDiv col-md-12">
					<img src={image} class="img-rounded" alt="Cinque Terre" width="100%" height="236"/>
					</div>
					
					<div class="caption-full">
						<h4>
							<a href="#"></a>
						</h4>
						<p></p>
						
							<p>
								Home delivery <span class="glyphicon glyphicon-remove"></span>
							</p>
						
						<p>Phone: </p>
						<p>Address: </p>
						
							<p>
								Home delivery <span class="glyphicon glyphicon-remove"></span>
							</p>

						<p>Description: </p>
						
							</div>
				</div>
			</div>
		</div>
	</div>
</div>
        );
    }
}
