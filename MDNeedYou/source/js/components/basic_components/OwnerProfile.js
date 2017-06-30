import React from "react";
import { getBusiness, updateBusiness } from "../../actions/businessActions";
import { getReservation } from "../../actions/reservationAction";
import { connect } from "react-redux"
import removeValue from "remove-value"
import categories from '../../utils/categories'
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
	business: store.business.business,
	reservation: store.reservation.reservation
}))
export default class OwnerProfile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.business.businessId,
			photo: '',
			name: '',
			streetNumber: '',
			city: '',
			streetName: '',
			state: '',
			zip: '',
			phone: '',
			email: '',
			availability: [],
			desctription: '',
			category: '',
			webSite: '',
			password: '',
			password2: '',
			ownerName: '',
			ownerPhone: '',
			ownerEmail: '',
			imagePreviewUrl: '',
			hourDisplay: 'none',
			appointmentDisplay: 'none',
			avatar: '',
			isUploading: false,
			progress: 0,
			avatarURL: '',
			photoInfo: true,
			businessInfo: false,
			personalInfo: false,
			workingInfo: false,
			calendarInfo: false,
			listInfo: false,
			currentShow: 'photoInfo',
			thInput: {
				'display': 'none'
			},
			thButtunName: 'Filter',
			filter: false,
			saveImageSuccess:{
				'display':'none'
			},
			saveImageError:{
				'display':'none'
			}

		};
		this.filterByname = '',
			this.filterByEmail = '',
			this.filterByPhone = '',
			this.filterByDate = '',
			this.handleSubmit = this.handleSubmit.bind(this);
		this.fetchWorkingHours = this.fetchWorkingHours.bind(this);
		this.fetchAppointment = this.fetchAppointment.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleInfo = this.handleInfo.bind(this);
		this.showThInput = this.showThInput.bind(this);
		this.thInputHandleChange = this.thInputHandleChange.bind(this);
	}

	handleChangeUsername = (event) => this.setState({ username: event.target.value });
	handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })
	handleProgress = (progress) => this.setState({ progress });
	handleUploadError = (error) => {
		this.setState({ isUploading: false });
		console.error(error);
		this.setState({saveImageSuccess:{'display':'none'}})
		this.setState({saveImageError:{'display':'block'}})
	}
	handleUploadSuccess = (filename) => {
		this.setState({ avatar: filename, progress: 100, isUploading: false });
		var a = firebase.storage().ref('images').child(filename);
		url = a.getDownloadURL().then(url => this.setState({ avatarURL: url }));
		
	};

	fetchWorkingHours() {

	}

	fetchAppointment() {

	}

	thInputHandleChange(e) {
		this.setState({ filter: true })
		switch (e.target.name) {
			case "name": this.filterByName = e.target.value
				break
			case "email": this.filterByEmail = e.target.value
				break
			case "phone": this.filterByPhone = e.target.value
				break
			case "date": this.filterByDate = e.target.value
				break
		}
		this.handleChangeFilter(e.target.name, e.target.value);
	}

	handleChangeFilter(target, value) {
		debugger
		let name = this.filterByName
		let email = this.filterByEmail
		let phone = this.filterByPhone
		let date = this.filterByDate
		switch (target) {
			case "name": name = value
				break
			case "email": email = value
				break
			case "phone": phone = value
				break
			case "date": date = value
				break
		}
		let list = [];
		for (var i of this.props.reservation) {
			i.user.name.toString().substr(0, name.length) === name &&
				i.user.email.toString().substr(0, email.length) === email &&
				i.user.phone.toString().substr(0, phone.length) === phone &&
				i.date.toString().substr(0, date.length) === date ? list.push(i) : null
		}
		this.setState({ availability: list });
	}

	showThInput() {
		this.state.thInput.display == 'none' ? this.setState({ thInput: { 'display': 'block' } }) : this.setState({ thInput: { 'display': 'none' } }); this.setState({ filter: false })
		if (this.state.thInput.display !== 'none') {
			this.setState({ thButtunName: 'Filter' });
			this.setState({ availability: [] })
		} else {
			this.setState({ thButtunName: 'Hide Filter' })
		}
	}

	handleInfo(e) {
		this.setState({ [this.state.currentShow]: false });
		this.setState({ currentShow: [e.target.name] });
		this.setState({ [e.target.name]: true });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });

	}

	handleSubmit(e) {
		this.props.dispatch(updateBusiness(this.state));
		if(this.state.avatarURL!=''){
			this.setState({saveImageSuccess:{'display':'block'}});
			this.setState({saveImageError:{'display':'none'}})
		}else{
			this.setState({saveImageError:{'display':'block'}})
			this.setState({saveImageSuccess:{'display':'none'}});
		}  
		
	}

	componentWillMount() {
		this.props.dispatch(getReservation(this.props.match.params.bId));
		this.props.dispatch(getBusiness(this.props.match.params.bId));
	}


	render() {
		var business = this.props.business;
		let {imagePreviewUrl} = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = (<img src={imagePreviewUrl} class="avatar" alt="avatar" />);
		} else {
			$imagePreview = (<div className="previewText">Please select an Image</div>);
		}
		const category = !categories ? [] : categories.map(
			(cat, index) => <option>{cat}</option>

		);
		debugger
		const appointments = !this.state.filter ? this.props.reservation : this.state.availability;
		const appointmentList = !appointments ? [] : appointments.map(
			(res, index) => <tr>
				<td>{res.user.name}</td>
				<td>{res.user.email}</td>
				<td>{res.user.phone}</td>
				<td>{res.date}</td>
				<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target={"#" + res.user.userId + "edit"} ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
				<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target={"#" + res.user.userId + "delete"} ><span class="glyphicon glyphicon-trash"></span></button></p></td>
				<div class="modal fade" id={res.user.userId + "edit"} tabIndex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
								<h4 class="modal-title custom_align" id="Heading">Edit Your Detail</h4>
							</div>
							<div class="modal-body">
								<div class="form-group">
									<input class="form-control " type="text" placeholder={res.user.name} />
								</div>
								<div class="form-group">

									<input class="form-control " type="text" placeholder="Irshad" />
								</div>
								<div class="form-group">
									<textarea rows="2" class="form-control" placeholder="CB 106/107 Street # 11 Wah Cantt Islamabad Pakistan"></textarea>


								</div>
							</div>
							<div class="modal-footer ">
								<button type="button" class="btn btn-warning btn-lg" style={{ "width": 100 }}><span class="glyphicon glyphicon-ok-sign"></span> Update</button>
							</div>
						</div>

					</div>

				</div>
				<div class="modal fade" id={res.user.userId + "delete"} tabIndex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
								<h4 class="modal-title custom_align" id="Heading">Delete this entry"</h4>
							</div>
							<div class="modal-body">

								<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Are you sure you want to delete this Record? {res.user.name}</div>

							</div>
							<div class="modal-footer ">
								<button type="button" class="btn btn-success" ><span class="glyphicon glyphicon-ok-sign"></span> Yes</button>
								<button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> No</button>
							</div>
						</div>

					</div>
				</div>
			</tr>)

		const workingDays = !this.props.business.availability ? [] : this.props.business.availability.days.map(
			(days, index) =>
				<div class="form-group">
					<label class="col-lg-3">{days.day}</label>
					<div class="col-lg-3">
						<select name="off" onChange={this.onChange} defaultValuealue={days.working}>
							<option value="ture">Working</option>
							<option value="false">Off</option>
						</select>
					</div>
					<div class="col-lg-3">
						<input class="form-control" name="open" placeholder="8:00" defaultValue={days.opening} onChange={this.onChange} type="text" />
					</div>
					<div class="col-lg-3">
						<input class="form-control" name="close" placeholder="17:00" defaultValue={days.closing} onChange={this.onChange} type="text" />
					</div>
				</div>

		);
		return (
			<div class="container owner">
				<h1>Edit Profile {this.props.business.name}</h1>
				<hr />
				<div class="row">
					<div class="col-md-3">
						<div class="list-group sider">
							<button onClick={this.handleInfo} name="photoInfo" class="list-group-item "><i class="fa fa-picture-o" aria-hidden="true"></i>  Business Photo</button>
							<button onClick={this.handleInfo} name="businessInfo" class="list-group-item "><i class="fa fa-user" aria-hidden="true"></i>  Business Info</button>
							<button onClick={this.handleInfo} name="personalInfo" class="list-group-item "><i class="fa fa-user" aria-hidden="true"></i>  Personal Info</button>
							<button onClick={this.handleInfo} name="workingInfo" class="list-group-item"><i class="fa fa-clock-o" aria-hidden="true"></i>  Working Days</button>
							<a href="#demo" class="list-group-item" data-toggle="collapse"><i class="fa fa-calendar-check-o" aria-hidden="true"></i>  Appointments  <i class="fa fa-bars" aria-hidden="true"></i></a>
							<div id="demo" class="collapse">
								<button onClick={this.handleInfo} name="calendarInfo" class="list-group-item collaspe"><i class="fa fa-calendar" aria-hidden="true"></i>  Calendar</button>
								<button onClick={this.handleInfo} name="listInfo" class="list-group-item"><i class="fa fa-list" aria-hidden="true"></i>  List</button>
							</div>
						</div>
					</div>
					<div class="col-md-9">
						{this.state.photoInfo && business.category &&
							<div class="photoDiv">
								<form class="uploader">
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
							</div>}

						{this.state.businessInfo && business.category &&
							<div class="Business-info">
								<h3>Business info</h3>
								<form class="form-horizontal" role="form">
									<div class="form-group">
										<label class="col-lg-3 control-label">Name:</label>
										<div class="col-lg-8">
											<input class="form-control" name="name" onChange={this.onChange} placeholder="name" defaultValue={business.name} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Street name:</label>
										<div class="col-lg-8">
											<input class="form-control" name="streetName" onChange={this.onChange} placeholder="street name" defaultValue={business.address.streetName} type="text" />
										</div>
									</div>

									<div class="form-group">
										<label class="col-lg-3 control-label">Street number:</label>
										<div class="col-lg-8">
											<input class="form-control" name="streetNumber" onChange={this.onChange} placeholder="street number" defaultValue={business.address.streetNumber} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Zip code:</label>
										<div class="col-lg-8">
											<input class="form-control" name="zip" onChange={this.onChange} placeholder="zip code" defaultValue={business.address.zipCode} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">City:</label>
										<div class="col-lg-8">
											<input class="form-control" name="city" onChange={this.onChange} placeholder="city" defaultValue={business.address.city} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">State:</label>
										<div class="col-lg-8">
											<input class="form-control" name="state" onChange={this.onChange} placeholder="state" defaultValue={business.province} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Phone:</label>
										<div class="col-lg-8">
											<input class="form-control" name="phone" onChange={this.onChange} placeholder="phone" defaultValue={business.contact.phoneNumber} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Email:</label>
										<div class="col-lg-8">
											<input class="form-control" name="email" onChange={this.onChange} placeholder="email" defaultValue={business.contact.email} type="email" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Description:</label>
										<div class="col-lg-8">
											<input class="form-control" name="description" onChange={this.onChange} placeholder="description" defaultValue={business.description} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Category:</label>
										<div class="col-lg-8">
											<select class="form-control" defaultValue={business.category.name} name="category" onChange={this.onChange} >
												{category}
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Web site:</label>
										<div class="col-lg-8">
											<input class="form-control" name="webSite" onChange={this.onChange} placeholder="url" defaultValue={business.webSite} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Password:</label>
										<div class="col-lg-8">
											<input class="form-control" name="password1" onChange={this.onChange} placeholder="confirm" defaultValue={business.password} type="password" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Confirm Password:</label>
										<div class="col-lg-8">
											<input class="form-control" name="password2" onChange={this.onChange} placeholder="password" defaultValue={business.password} type="password" />
										</div>
									</div>
								</form>
							</div>}
						{this.state.personalInfo && business.category &&
							<div class="personal-info">
								<h3>Personal info</h3>
								<form class="form-horizontal" role="form">
									<div class="form-group">
										<label class="col-lg-3 control-label">Name:</label>
										<div class="col-lg-8">
											<input class="form-control" name="ownerName" onChange={this.onChange} placeholder="name" defaultValue={business.user.name} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Phone:</label>
										<div class="col-lg-8">
											<input class="form-control" name="ownerPhone" onChange={this.onChange} placeholder="phone" defaultValue={business.user.phone} type="text" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Email:</label>
										<div class="col-lg-8">
											<input class="form-control" name="ownerEmail" onChange={this.onChange} placeholder="email" defaultValue={business.user.email} type="text" />
										</div>
									</div>
								</form>
							</div>}
						{this.state.workingInfo && business.category &&
							<div class="working-info">
								<h3>Working info</h3>
								<form class="form-horizontal" role="form">
									<div class="form-group">
										<label class="col-lg-3">Day</label>
										<label class="col-lg-3">Off</label>
										<label class="col-lg-3">Opening</label>
										<label class="col-lg-3">Closing</label>
									</div>
									{workingDays}
								</form>
							</div>}
						{this.state.calendarInfo && business.category &&
							<div class="working-info">
								<h3>Appointments info</h3>
								<Calendar />
							</div>}
						{this.state.listInfo && business.category &&
							<div class="list-info">
								<h3>List info </h3>
								<button onClick={this.showThInput} id="searchList">{this.state.thButtunName} <i class="fa fa-search" aria-hidden="true"></i></button>
								<br />
								<div class="container">
									<div class="row">
										<div class="col-md-12">
											<div class="table-responsive">
												<table id="mytable" class="table table-bordred table-striped">
													<thead>

														<th>Name<input name="name" ref="input" placeholder="search by name" onChange={this.thInputHandleChange} style={this.state.thInput} type="text" /></th>
														<th>Email<input name="email" ref="input" placeholder="search by email" onChange={this.thInputHandleChange} style={this.state.thInput} type="text" /></th>
														<th>Phone<input name="phone" ref="input" placeholder="search by phone" onChange={this.thInputHandleChange} style={this.state.thInput} type="text" /></th>
														<th>Date<input name="date" ref="input" placeholder="eg: 2017-06-12" onChange={this.thInputHandleChange} style={this.state.thInput} type="text" /></th>
														<th>Edit</th>
														<th>Delete</th>
													</thead>
													<tbody>
														{appointmentList}
													</tbody>
												</table>
												<div class="clearfix"></div>
												<ul class="pagination pull-right">
													<li class="disabled"><a href="#"><span class="glyphicon glyphicon-chevron-left"></span></a></li>
													<li class="active"><a href="#">1</a></li>
													<li><a href="#">2</a></li>
													<li><a href="#">3</a></li>
													<li><a href="#">4</a></li>
													<li><a href="#">5</a></li>
													<li><a href="#"><span class="glyphicon glyphicon-chevron-right"></span></a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>}
							<div class="saveImage">
									<div class="alert alert-success" style={this.state.saveImageSuccess}>
										<strong>Success!</strong> Photo saved successfully.
									</div>
									<div class="alert alert-danger" style={this.state.saveImageError}>
										<strong>Error!</strong> Photo has not been saved.
									</div>
									<button class="btn btn-lg btn-primary" onClick={this.handleSubmit}>Save  <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
									
								</div>
					</div>
					<div>
					</div>
				</div>
			</div>
		);
	}
}
