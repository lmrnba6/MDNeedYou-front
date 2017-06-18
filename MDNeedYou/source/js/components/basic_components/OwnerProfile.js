import React from "react";
import { getBusiness, updateBusiness } from "../../actions/businessActions";
import { connect } from "react-redux"

import Calendar from "./Calendar"
import firebase from 'firebase';
import ImageUploader from 'react-firebase-image-uploader';
 
var config = {
    apiKey: "AIzaSyCQxloG2lYAw4Ea0F_b6tuFoXIjV38pSNs",
    authDomain: "mdneedyou-f1742.firebaseapp.com",
    databaseURL: "https://mdneedyou-f1742.firebaseio.com",
    projectId: "mdneedyou-f1742",
    storageBucket: "mdneedyou-f1742.appspot.com",
    messagingSenderId: "733597166803"
  };
  firebase.initializeApp(config);

@connect(store => ({
    business: store.business.business
}))
export default class Payment extends React.Component {

	constructor() {
		super();
		this.state = { 
			id: '',
			photo: '',
			imagePreviewUrl: '',
			hourDiplay: 'none',
			appointmentDisplay :'none',
        	avatar: '',
        	isUploading: false,
        	progress: 0,
        	avatarURL: ''
		 };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fetchWorkingHours = this.fetchWorkingHours.bind(this);
		this.fetchAppointment = this.fetchAppointment.bind(this);

	}
	handleChangeUsername = (event) => this.setState({username: event.target.value});
    handleUploadStart = () => this.setState({isUploading: true, progress: 0})
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({avatar: filename, progress: 100, isUploading: false});
        var a=firebase.storage().ref('images').child(filename);
		url = a.getDownloadURL().then(url => this.setState({avatarURL: url}));
    };

	fetchWorkingHours(){

	}

	fetchAppointment(){

	}

	handleSubmit(e) {
		this.setState({id:this.props.business.businessId})
		debugger
		this.props.dispatch(updateBusiness(this.state));
	}

	componentWillMount() {
		this.props.dispatch(getBusiness(this.props.match.params.bId));
	}


	render() {
		let {imagePreviewUrl} = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = (<img src={imagePreviewUrl} class="avatar" alt="avatar" />);
		} else {
			$imagePreview = (<div className="previewText">Please select an Image</div>);
		}
		return (

			<div class="container owner">
				<h1>Edit Profile {this.props.business.name}</h1>
				<hr />
				<div class="row">
				<div class="col-md-3">
					 <form>
                    {this.state.isUploading &&
                        <p>Progress: {this.state.progress} <i class="fa fa-spinner"></i></p>
                    }
                    {
						<div class="image">
                        <img class="img-responsive img-rounded" height="20px" alt="Cinque Terre" src={this.state.avatarURL || this.props.business.photo} />
						</div>
                    }
                    <ImageUploader
                        name="avatar"
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </form>
				<button onClick={this.handleSubmit}>send </button>
                <br/>
                <div class="list-group">
               		 <a href='' class="list-group-item active">Home</a>
                    <a href="#" class="list-group-item">Working hours</a>
					<a href="#" class="list-group-item">Appointments</a>
					<a href="#" class="list-group-item">Logout</a>

          		</div>
					</div>


					<div class="col-md-9 personal-info">
						<div class="alert alert-info alert-dismissable">
							<a class="panel-close close" data-dismiss="alert">×</a>
							<i class="fa fa-coffee"></i>
							This is an <strong>.alert</strong>. Use this to show important messages to the user.
       					 </div>
						<h3>Personal info</h3>

						<form class="form-horizontal" role="form">
							<div class="form-group">
								<label class="col-lg-3 control-label">First name:</label>
								<div class="col-lg-8">
									<input class="form-control" type="text" value="Jane" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-lg-3 control-label">Last name:</label>
								<div class="col-lg-8">
									<input class="form-control" type="text" value="Bishop" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-lg-3 control-label">Company:</label>
								<div class="col-lg-8">
									<input class="form-control" type="text" value="" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-lg-3 control-label">Email:</label>
								<div class="col-lg-8">
									<input class="form-control" type="text" value="janesemail@gmail.com" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-lg-3 control-label">Time Zone:</label>
								<div class="col-lg-8">
									<div class="ui-select">
										<select id="user_time_zone" class="form-control">
											<option value="Hawaii">(GMT-10:00) Hawaii</option>
											<option value="Alaska">(GMT-09:00) Alaska</option>
											<option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
											<option value="Arizona">(GMT-07:00) Arizona</option>
											<option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
											<option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
											<option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
											<option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
										</select>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">Username:</label>
								<div class="col-md-8">
									<input class="form-control" type="text" value="janeuser" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">Password:</label>
								<div class="col-md-8">
									<input class="form-control" type="password" value="11111122333" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">Confirm password:</label>
								<div class="col-md-8">
									<input class="form-control" type="password" value="11111122333" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label"></label>
								<div class="col-md-8">
									<input type="button" class="btn btn-primary" value="Save Changes" />
									<span></span>
									<input type="reset" class="btn btn-default" value="Cancel" />
								</div>
							</div>
						</form>
					</div>
				</div>
				<div>
            </div>
			</div>
		);
	}
}
