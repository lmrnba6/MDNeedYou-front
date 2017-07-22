import React from "react";
import { getBusiness, updateBusiness } from "../../actions/businessActions";
import { getReservation } from "../../actions/reservationAction";
import { connect } from "react-redux"
import removeValue from "remove-value"
import categories from '../../utils/categories'
//import Moment from 'react-moment';
import Calendar from "./Calendar"
import firebase from 'firebase';
import ImageUploader from 'react-firebase-image-uploader';
import { deleteAppointment, schedule } from "../../actions/reservationAction";

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
			photo: this.props.business.photo,
			name: this.props.business.name,
			streetNumber: this.props.business.address && this.props.business.address.streetNumber,
			city: this.props.business.address && this.props.business.address.city,
			streetName: this.props.business.address && this.props.business.address.streetName,
			state: this.props.business.address && this.props.business.address.province,
			zip: this.props.business.address && this.props.business.address.zipCode,
			phone: this.props.business.contact && this.props.business.contact.phone,
			email: this.props.business.contact && this.props.business.contact.email,
			availability: this.props.business.availability && this.props.business.availability.days,
			description: this.props.business.description,
			category: this.props.business.category && this.props.business.category.name,
			webSite: this.props.business.website,
			password: this.props.business.password,
			password2: this.props.business.password,
			ownerName: this.props.business.user && this.props.business.user.name,
			ownerPhone: this.props.business.user && this.props.business.user.phone,
			ownerEmail: this.props.business.user && this.props.business.user.email,
			imagePreviewUrl: '',
			hourDisplay: 'none',
			appointmentDisplay: 'none',
			avatar: '',
			events: [],
			isUploading: false,
			progress: 0,
			avatarURL: this.props.business.photo,
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
			saveSuccess: {
				'display': 'none'
			},
			saveError: {
				'display': 'none'
			},
			errorMessage: '',
			isUpdate: false

		};
		this.filterByName = '',
			this.filterByEmail = '',
			this.filterByPhone = '',
			this.filterByDate = '',
			this.filterByStatus = '',
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
		this.setState({ saveSuccess: { 'display': 'none' } })
		this.setState({ saveError: { 'display': 'block' } })
	}
	handleUploadSuccess = (filename) => {
		this.setState({ avatar: filename, progress: 100, isUploading: false });
		var a = firebase.storage().ref('images').child(filename);
		url = a.getDownloadURL().then(url => this.setState({ avatarURL: url }));

	};

	fetchWorkingHours() {
	}

	deleteAppointment(res) {
		let post = {
			id: this.state.id,
			reservationId: res.currentTarget.name
		}
		debugger
		this.props.dispatch(deleteAppointment(post));
	}

	approveAppointment(res) {

		let post = {
			id: this.state.id,
			reservationId: res.currentTarget.name,
			isUpdate: true
		}
		this.props.dispatch(schedule(post));
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
			case "status": this.filterByStatus = e.target.value
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
		let status = this.filterByStatus
		switch (target) {
			case "name": name = value
				break
			case "email": email = value
				break
			case "phone": phone = value
				break
			case "date": date = value
				break
			case "status": status = value
				break
		}
		let list = [];
		for (var i of this.props.reservation) {
			i.user.name.toString().substr(0, name.length) === name &&
				i.user.email.toString().substr(0, email.length) === email &&
				i.user.phone.toString().substr(0, phone.length) === phone &&
				i.status.toString().substr(0, status.length) === status &&
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
		debugger
		this.setState({ [this.state.currentShow]: false });
		this.setState({ currentShow: [e.target.name] });
		this.setState({ [e.target.name]: true });
		this.setState({ saveError: { 'display': 'none' } })
		this.setState({ saveSuccess: { 'display': 'none' } });
	}

	onChange(e) {
		debugger
		this.setState({ [e.target.name]: e.target.value });
		let av = this.props.business.availability.days;
		for (let i of av) {
			if (i.day === e.target.name.split('.', 2)[0]) {
				switch (e.target.name.split('.', 2)[1]) {
					case 'off': i.working = e.target.value
						break
					case 'open': i.opening = e.target.value
						break
					case 'close': i.closing = e.target.value
						break
				}
			}
		}
		this.setState({availability : av});


	}

	validate() {
		debugger
		let check = false
		this.state.password === this.state.password2 ? check = true : check = false; this.setState({ errorMessage: "passwords don't match" })
		return check
	}

	handleSubmit(e) {
		e.preventDefault();
		debugger
		if (this.validate()) {
			$(this.alertSuccess).show().delay(3000).fadeOut(800)
			this.props.dispatch(updateBusiness(this.state));
			//this.setState({ saveSuccess: { 'display': 'block' } })
			//this.setState({ saveError: { 'display': 'none' } })

		} else {
			$(this.alertError).show()//.delay(3000).fadeOut(800)
			//this.setState({ saveError: { 'display': 'block' } })
			//this.setState({ saveSuccess: { 'display': 'none' } })
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
			(cat, index) => <option key={index}>{cat}</option>

		);
		debugger
		const appointments = !this.state.filter ? this.props.reservation : this.state.availability;
		const appointmentList = !appointments ? [] : appointments.map(
			(res, index) => <tr key={index}>
				<td>{res.user.name}</td>
				<td>{res.user.email}</td>
				<td>{res.user.phone}</td>
				<td>{res.date}</td>
				<td>{res.status}</td>
				<td><p data-placement="top" data-toggle="tooltip" title="Detail"><button class="btn btn-primary" data-title="detail" data-toggle="modal" data-target={"#" + res.user.userId + "edit"} ><span class="glyphicon glyphicon-exclamation-sign"></span></button></p></td>
				<td><p data-placement="top" data-toggle="tooltip" title="Remove"><button class="btn btn-danger" data-title="detail" data-toggle="modal" data-target={"#" + res.user.userId + "remove"} ><span class="glyphicon glyphicon-trash"></span></button></p></td>
				{res.status === 'pending' ?
					<td><p data-placement="top" data-toggle="tooltip" title="approve"><button class="btn btn-info" data-title="approve" data-toggle="modal" data-target={"#" + res.user.userId + "approve"} ><span class="glyphicon glyphicon-question-sign"></span></button></p></td> :
					<td><p data-placement="top" data-toggle="tooltip" title="approve"><button class="btn btn-success" data-title="approve" data-toggle="modal" data-target={"#" + res.user.userId + "approve"} ><span class="glyphicon glyphicon-ok-sign"></span></button></p></td>}
				<div class="modal fade" id={res.user.userId + "edit"} tabIndex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
								<h4 class="modal-title custom_align" id="Heading">Appointment Details</h4>
							</div>
							<div class="modal-body">
								<div class="form-group">
									<label>Reservation Number</label>
									<input class="form-control " type="text" value={res.reservationNumber} disabled />
								</div>
								<div class="form-group">
									<label>Time</label>
									<input class="form-control " type="text" value={res.time} disabled />
								</div>
								<div class="form-group">
									<label>Message</label>
									<input class="form-control" disabled value={res.comment} />
								</div>
								<div class="form-group">
									<label>Status</label>
									<input class="form-control" disabled value={res.status} />
								</div>
							</div>
							{/*<div class="modal-footer ">
								<button type="button" class="btn btn-success btn-lg" ><span class="glyphicon glyphicon-ok-sign"></span>Approve</button>
							</div>*/}
						</div>

					</div>

				</div>
				<div class="modal fade" id={res.user.userId + "approve"} tabIndex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
								<h4 class="modal-title custom_align" id="Heading">Approve this appointment"</h4>
							</div>
							<div class="modal-body">

								<div class="alert alert-warning"><span class="glyphicon glyphicon-warning-sign"></span> Are you sure you want to change the status of this appointment?</div>

							</div>
							<div class="modal-footer ">
								<button type="button" class="btn btn-success" name={res.reservationId} onClick={this.approveAppointment.bind(this)} data-dismiss="modal" ><span class="glyphicon glyphicon-ok-sign"></span> Yes</button>
								<button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> No</button>
							</div>
						</div>

					</div>
				</div>

				<div class="modal fade" id={res.user.userId + "remove"} tabIndex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
								<h4 class="modal-title custom_align" id="Heading">Remove this appointment"</h4>
							</div>
							<div class="modal-body">

								<div class="alert alert-warning"><span class="glyphicon glyphicon-warning-sign"></span> Are you sure you want to remove this appointment?</div>

							</div>
							<div class="modal-footer ">
								<button type="button" name={res.reservationId} onClick={this.deleteAppointment.bind(this)} class="btn btn-success" data-dismiss="modal" ><span class="glyphicon glyphicon-ok-sign"></span> Yes</button>
								<button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> No</button>
							</div>
						</div>

					</div>
				</div>
			</tr>)

		const workingDays = !this.props.business.availability ? [] : this.props.business.availability.days.map(
			(days, index) =>
				<div class="form-group" key={index}>
					<label class="col-lg-3">{days.day}</label>
					<div class="col-lg-3">
						<select name={days.day + ".off"} onChange={this.onChange} defaultValue={days.working}>
							<option value="true">Working</option>
							<option value="false">Off</option>
						</select>
					</div>
					<div class="col-lg-3">
						<input class="form-control" name={days.day + ".open"} placeholder="8:00" defaultValue={days.opening} onChange={this.onChange} type="text" autoComplete="off" required />
					</div>
					<div class="col-lg-3">
						<input class="form-control" name={days.day + ".close"} placeholder="17:00" defaultValue={days.closing} onChange={this.onChange} type="text" autoComplete="off" required />
					</div>
				</div>

		);
		return (
			<div class="container owner">
				<h1><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Your Profile</h1>
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
								<form class="uploader" autoComplete="off">
									{this.state.isUploading &&
										<p>Progress: {this.state.progress} <i class="fa fa-spinner"></i></p>
									}
									{
										<div class="image">
											<img class="img-responsive img-rounded" height="20px" alt="Cinque Terre" src={this.props.business.photo ||this.state.avatarURL} />
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
								<div id="photoDiv">
									<button class="btn btn-lg btn-primary" onClick={this.handleSubmit}>Save  <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
								</div>
							</div>}

						{this.state.businessInfo && business.category &&
							<div class="Business-info">
								<h3>Business info</h3>
								<form class="form-horizontal" role="form" onSubmit={this.handleSubmit} autoComplete="off">
									<div class="form-group">
										<label class="col-lg-3 control-label">Name:</label>
										<div class="col-lg-8">
											<input class="form-control" name="name" ref={(input) => { this.nameInput = input; } } onChange={this.onChange} placeholder="name" defaultValue={business.name} type="text" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Street name:</label>
										<div class="col-lg-8">
											<input class="form-control" name="streetName" onChange={this.onChange} placeholder="street name" defaultValue={business.address.streetName} type="text" required />
										</div>
									</div>

									<div class="form-group">
										<label class="col-lg-3 control-label">Street number:</label>
										<div class="col-lg-8">
											<input class="form-control" name="streetNumber" onChange={this.onChange} placeholder="street number" defaultValue={business.address.streetNumber} type="text" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Zip code:</label>
										<div class="col-lg-8">
											<input class="form-control" name="zip" onChange={this.onChange} placeholder="zip code" defaultValue={business.address.zipCode} type="text" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">City:</label>
										<div class="col-lg-8">
											<input class="form-control" name="city" onChange={this.onChange} placeholder="city" defaultValue={business.address.city} type="text" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">State:</label>
										<div class="col-lg-8">
											<input class="form-control" name="state" onChange={this.onChange} placeholder="state" defaultValue={business.address.province} type="text" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Phone:</label>
										<div class="col-lg-8">
											<input class="form-control" name="phone" onChange={this.onChange} placeholder="phone" defaultValue={business.contact.phone} type="text" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Email:</label>
										<div class="col-lg-8">
											<input class="form-control" name="email" onChange={this.onChange} placeholder="email" defaultValue={business.contact.email} type="email" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Description:</label>
										<div class="col-lg-8">
											<input class="form-control" name="description" onChange={this.onChange} placeholder="description" defaultValue={business.description} type="text" required />
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
											<input class="form-control" name="webSite" onChange={this.onChange} placeholder="url" defaultValue={business.website} type="text" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Password:</label>
										<div class="col-lg-8">
											<input class="form-control" name="password" onChange={this.onChange} placeholder="confirm" defaultValue={business.password} type="password" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Confirm Password:</label>
										<div class="col-lg-8">
											<input class="form-control" name="password2" onChange={this.onChange} placeholder="password" defaultValue={business.password} type="password" required />
										</div>
									</div>
									<div id="photoDiv">
										<button class="btn btn-lg btn-primary">Save  <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
									</div>
								</form>
							</div>}
						{this.state.personalInfo && business.category &&
							<div class="personal-info">
								<h3>Personal info</h3>
								<form class="form-horizontal" onSubmit={this.handleSubmit} role="form" autoComplete="off">
									<div class="form-group">
										<label class="col-lg-3 control-label">Name:</label>
										<div class="col-lg-8">
											<input class="form-control" name="ownerName" onChange={this.onChange} placeholder="name" defaultValue={business.user.name} type="text" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Phone:</label>
										<div class="col-lg-8">
											<input class="form-control" name="ownerPhone" onChange={this.onChange} placeholder="phone" defaultValue={business.user.phone} type="text" required />
										</div>
									</div>
									<div class="form-group">
										<label class="col-lg-3 control-label">Email:</label>
										<div class="col-lg-8">
											<input class="form-control" name="ownerEmail" onChange={this.onChange} placeholder="email" defaultValue={business.user.email} type="email" required />
										</div>
									</div>
									<div id="photoDiv">
										<button class="btn btn-lg btn-primary">Save  <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
									</div>
								</form>
							</div>}
						{this.state.workingInfo && business.category &&
							<div class="working-info">
								<h3>Working info</h3>
								<form class="form-horizontal" onSubmit={this.handleSubmit} role="form" autoComplete="off">
									<div class="form-group">
										<label class="col-lg-3">Day</label>
										<label class="col-lg-3">Off</label>
										<label class="col-lg-3">Opening</label>
										<label class="col-lg-3">Closing</label>
									</div>
									{workingDays}
									<div id="photoDiv">
										<button class="btn btn-lg btn-primary">Save  <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
									</div>
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
								<button class="btn btn-primary" onClick={this.showThInput} id="searchList">{this.state.thButtunName} <i class="fa fa-search" aria-hidden="true"></i></button>
								<br />
							{appointmentList.length==0 ?  <div class="alert alert-info" role="alert"><strong> 0 Appointment found</strong> </div> : ''}
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
														<th>Status<input name="status" ref="input" placeholder="eg: approved" onChange={this.thInputHandleChange} style={this.state.thInput} type="text" /></th>
														<th>Details</th>
														<th>Remove</th>
														<th>Approve</th>
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
								{!this.state.calendarInfo || !this.state.listInfo && 
									<div id="photoDiv">
									<button onClick={this.handleSubmit} class="btn btn-lg btn-primary">Save <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
								</div>}
							</div>}
						<div class="saveImage col-md-6 col-md-offset-3">
							<div class="alert alert-success" ref={(input) => { this.alertSuccess = input; } } style={this.state.saveSuccess}>
								<strong>Success!</strong> Changes saved successfully.
									</div>
							<div class="alert alert-danger" ref={(input) => { this.alertError = input; } } style={this.state.saveError}>
								<strong>Error!</strong> {this.state.errorMessage}
							</div>
						</div>
					</div>
					<div>
					</div>
				</div>
			</div>
		);
	}
}
