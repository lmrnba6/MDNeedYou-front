import React from "react";
import { IndexLink, Link } from "react-router-dom";
import { DateField } from 'react-date-picker';
import { connect } from "react-redux"
import 'react-date-picker/index.css'
import removeValue from "remove-value"

import { schedule, fetchHours } from "../../actions/businessActions"

@connect(store => {
    return {
        business: store.business.business
    };
})
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
        };
        this.business=this.props.name;
        this.handleChange = this.handleChange.bind(this);
        this.book = this.book.bind(this);
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

    shouldComponentUpdate (nextProps, nextState) {
        this.business = !nextProps.business.businessId ? this.business : nextProps.business;
        return true;
    }

    getHours(date) {
        const post = {
            id: this.business.businessId,
            date: date,
        }
        this.setState({ date: date });
        this.setState({ id: this.business.businessId });
        this.props.dispatch(fetchHours(post));
    }
    validate() {
        if (this.state.date.length===0 || this.state.time.length===0  || this.state.email.length===0  || this.state.name.length===0  || this.state.phone.length===0 ) {
            this.setState({ error: { display: 'block' } })
            return false;
        } else {
            this.setState({ error: { display: 'none' } })
            return true;
        }
    }

    book(e) {
        if(this.validate()){
            //alert('Are you sure you want to schedule this appointment')
            //this.props.dispatch(schedule(this.state));
            this.setState({ success: { display: 'block' } })
            this.setState({ error: { display: 'none' } })
            this.setState({ form: { display: 'none' } })
            this.setState({ confirm: { display: 'block' } })
           
        } 
    }

    createHours() {
        var arr = [], i, j;
        const time = this.props.business;
        for (i = 8; i < 10; i++) {
            for (j = 0; j < 2; j++) {
                var schedule = (i<10 ? '0'+i : i) + ":" + (j === 0 ? "00" : 30 * j)
                arr.push(schedule);
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
        const arr = this.createHours();
        const hours = (!arr.length) ? [] : arr.map(
            (d, index) => <option key={index} value={d} class="">{d}</option>
        );
        const add = !this.business.address ? '' : this.business.address;
        return (

            <div class="appointment">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 text-center">
                            <h1 id="profileTitle">{this.business.name}</h1>
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
                        <br/>
                        <h5>Date: {this.state.date}</h5>
                        <h5>Time: {this.state.time}</h5>
                        <h5>Address: {add.streetNumber} {add.streetName} {add.city}  </h5>
					</div>
				</div>
				<div class="space"></div>
			</div> 
		</div>
                     <br/>
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
                                            <input type="text" onChange={this.handleChange} class="form-control" name="name" placeholder="Your Name *" required />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                        <div class="form-group">
                                            <input type="email" onChange={this.handleChange} class="form-control" name="email" placeholder="Your Email *" required />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                        <div class="form-group">
                                            <input type="tel" onChange={this.handleChange} class="form-control" name="phone" placeholder="Your Phone *" required />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                        <div class="form-group">


                                            <select class="hours pull-right" name="time" onChange={this.handleChange} >
                                                <option value="" ></option>
                                                {hours}
                                            </select>
                                            <DateField
                                                dateFormat="YYYY-MM-DD"
                                                onChange={dateString => { this.getHours(dateString) } }
                                                />

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <textarea class="form-control" onChange={this.handleChange} placeholder="Your Message *" name="message" required></textarea>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-lg-12 text-center">
                                        <div style={this.state.error} class="alert alert-danger">
                                            <strong>Error!</strong> Please make sure all fields are not empty.
                                        </div>
                                        <div id="success"></div>
                                    </div>
                                </div>
                            </form>
                                        <p class="pull-left">{arr.length} appoinment(s) available</p>
                            <button  onClick={this.book} class="btn btn-lg pull-right">Book now</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
