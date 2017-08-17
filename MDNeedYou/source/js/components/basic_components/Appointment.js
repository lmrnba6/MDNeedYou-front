import React from "react"
import { IndexLink, Link } from "react-router-dom"
import { DateField } from 'react-date-picker'
import { connect } from "react-redux"
import 'react-date-picker/index.css'
import removeValue from "remove-value"
import Payment from "./Payment"
import Recaptcha from 'react-gcaptcha'
import string from 'string'
import { schedule, fetchHours } from "../../actions/reservationAction"

@connect(store => ({
    hours: store.hours.hours,
    business: store.business.business
}))
export default class Appointment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            id: '',
            time: '',
            name: '',
            email: '',
            phone: '',
            message: '',
            error: {
                display: 'none'
            },
            success: {
                display: 'none'
            },
            form: {
                display: 'block'
            },
            confirm: {
                display: 'none'
            },
            errorMessage: 'Please make sure all fields are not empty',
            robot: true,
            isUpdate: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.book = this.book.bind(this);
        this.callback = this.callback.bind(this);
        this.loaded = this.loaded.bind(this);
    }

    handleChange(e) {

        switch (e.target.name) {
            case 'name':
                this.setState({ name: e.target.value })
                break;
            case 'email':
                this.setState({ email: e.target.value })
                break;
            case 'phone':
                this.setState({ phone: e.target.value })
                break;
            case 'message':
                this.setState({ message: e.target.value })
                break;
            case 'time':
                this.setState({ time: e.target.value })
                break;
            default:
            //nothing
        }


    }

    callback(key) {
        //console.log(key);
        this.setState({robot:false})
    };

    loaded() {
        //console.log('recaptchaLoaded');
    };


    getHours(date) {
        const post = {
            id: this.props.business.businessId,
            date: date,
        }
        debugger
        this.props.dispatch(fetchHours(post));
        this.setState({ date: date });
        this.setState({ id: this.props.business.businessId });
    }
    validate() {
        debugger
        if (this.state.robot || this.state.date.length === 0 || this.state.time.length === 0 || 
            this.state.email.length === 0 || this.state.name.length === 0 || 
            this.state.phone.length === 0 || new Date(this.state.date) < new Date()) {
            
            if(new Date(this.state.date) < new Date()){
                this.setState({errorMessage : 'The date must not be in the past'})
            }
            this.setState({ error: { display: 'block' } })
            return false;
        } else {
            this.setState({ error: { display: 'none' } })
            return true;
        }
    }

    book(e) {
        if (this.validate()) {
            //alert('Are you sure you want to schedule this appointment')
            this.props.dispatch(schedule(this.state));
            this.setState({ success: { display: 'block' } })
            this.setState({ error: { display: 'none' } })
            this.setState({ form: { display: 'none' } })
            this.setState({ confirm: { display: 'block' } })

        }
    }

    createHours() {
        debugger
        let opening,closing;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let parts = this.state.date.match(/(\d+)/g);
        let d = new Date(parts && parts[0], parts && parts[1]-1, parts && parts[2]);
        let dayName = days[d.getDay()];
        let working = true;
        for(let day of this.props.business.availability.days){
            if(day.day===dayName){
                if(!day.working){
                    working = false;
                    break;
                }
                opening= day.opening;
                closing = day.closing;
                break;
            }
        }
        const time = this.props.hours;
        var arr = [], i, j;
        if(opening && working){
            opening = Number(opening.substr(0, opening.length-3));
            closing = Number(closing.substr(0, closing.length-3));
            for (i = opening; i < closing; i++) {
                for (j = 0; j < this.props.business.availability.appointmentDuration; j++) {
                    var schedule = (i < closing ? '0' + i : i) + ":" + (j === 0 ? "00" : (j / this.props.business.availability.appointmentDuration) * 60)
                    schedule = schedule.length > 5 ? schedule.substring(1,6) : schedule;
                    arr.push(schedule);
                }
            }
        }
        for (var t = 0; t < time.length; t++) {
            for (var s = 0; s < arr.length; s++) {
                if (time[t] === arr[s] + ":00") {
                    removeValue(arr, arr[s]);
                }
            }
        }
        return arr;
    }

    render() {
        const arr = this.props.business && this.createHours();
        const hours = (!arr.length) ? [] : arr.map(
            (d, index) => <option key={index} value={d} class="">{d}</option>
        );
        const add = !this.props.business.address ? '' : this.props.business.address;
        const recapchaKey = window.location.host === 'localhost:8080' ? '6Lf2qSYUAAAAAOSxIslNmPVMWJAas0DMWszEofvD' : '6Lee_CoUAAAAAGdO_APftV5R4H0wZ8f-YYm4eXvt'
        return (

            <div class="appointment">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 text-center">
                            <h1 id="profileTitle">Doctor {this.props.business.name}</h1>
                            <h3 class="section-heading" style={this.state.form}>Book an appointment now</h3>
                            <br />
                        </div>
                    </div>
                    <div class="row" style={this.state.confirm}>
                        <div class="col-xs-12 col-sm-6 col-lg-6 col-md-offset-1">
                            <div class="box">
                                <div class="icon">
                                    <div class="image"><i class="fa fa-thumbs-o-up"></i></div>
                                    <div class="info">
                                        <h2 class="title">Thank you</h2>
                                        <br />
                                        <h5>Date: {this.state.date}</h5>
                                        <h5>Time: {this.state.time}</h5>
                                        <h5>Address: {add.streetNumber} {add.streetName} {add.city}  </h5>
                                    </div>
                                </div>
                                <div class="space"></div>
                            </div>
                        </div>
                        <br />
                        <div style={this.state.success} class="alert alert-success col-xs-12 col-sm-6 col-lg-6 col-md-offset-1">
                            <strong>Success!</strong> You scheduled an appointment. You will receive a confirmation email.
                                        </div>
                    </div>
                    <div class="row" style={this.state.form}>
                        <div class="col-md-8">
                            <form name="sentMessage" id="contactForm" >
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                        <label>Full Name:</label>
                                            <input type="text" onChange={this.handleChange} class="form-control" name="name" placeholder="Your Name *" required />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                        <div class="form-group">
                                        <label>Email:</label>
                                            <input type="email" onChange={this.handleChange} class="form-control" name="email" placeholder="Your Email *" required />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                        <div class="form-group">
                                        <label>Phone:</label>
                                            <input type="tel" onChange={this.handleChange} class="form-control" name="phone" placeholder="Your Phone *" required />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                        <div class="form-group hours">
                                        <label id="hoursLabel">Hours:</label>
                                            <select class="hours pull-right" name="time" onChange={this.handleChange} >
                                                <option value="" ></option>
                                                {hours}
                                            </select>
                                            </div>
                                            <div class="form-group dateFeild">
                                            <label>Date:</label>
                                            <DateField
                                                placeholder="Select a date"
                                                dateFormat="YYYY-MM-DD"
                                                onChange={dateString => { this.getHours(dateString) } }
                                                excludeDates={['2017-06-06']}
                                                />
                                                
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                        <label>Any Specifications?</label>
                                            <textarea class="form-control" onChange={this.handleChange} placeholder="Your Message *" name="message" required></textarea>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-lg-12 text-center">
                                        <div style={this.state.error} class="alert alert-danger">
                                            <strong>Error!</strong> {this.state.errorMessage}
                                        </div>
                                        <div id="success"></div>
                                    </div>
                                </div>
                            </form>
                            <p class="pull-left available">{arr.length}appoinment(s) available</p>
                            <Recaptcha
                                sitekey= {recapchaKey}
                                onloadCallback={this.loaded}
                                verifyCallback={this.callback}
                                />
                            <button onClick={this.book} class="btn btn-lg pull-right btn-info">Book now</button>
                        </div>
                        <Payment />
                    </div>
                </div>
            </div>
        );
    }
}
