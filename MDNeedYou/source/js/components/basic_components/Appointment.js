import React from "react";
import { IndexLink, Link } from "react-router-dom";
import DatePicker from "react-datepicker"
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

export default class Appointment extends React.Component {
	 constructor (props) {
    super(props)
    this.state = {
      month:'',
      day: '',
      hour:''
    };
    this.handleChange = this.handleChange.bind(this);
  }

handleChange(e){
    switch(e.target.className) {
    case 'months':
        this.setState({month:e.target.value})
        break;
    case 'days':
        this.setState({day:e.target.value})
        break;
    case 'hours':
         this.setState({hour:e.target.value})
        break;
    default:
        //nothing
    }
        console.log(this.state)
}

createDays(){
    var days=[];
    for (var i = 1; i < 31; i++){
        days.push(i);
    }
    return days;
}


	render() {
        const days = this.createDays();
        debugger
        const day = (!days.length) ? [] : days.map(
            (d, index) => <option value={d} class="">{d}</option>
        );

		return (
   <section class="appointment">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Book an appointment now</h2>
                    <br/>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <form name="sentMessage" id="contactForm" noValidate>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" value={this.props.name} class="form-control" placeholder="Your Name *" id="name" required data-validation-required-message="Please enter your name."/>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address."/>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="form-group">
                                    <input type="tel" class="form-control" placeholder="Your Phone *" id="phone" required data-validation-required-message="Please enter your phone number."/>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="form-group">
                        <select class="months" onChange={this.handleChange}>
                            <option value="Month" class="">Month</option>
                            <option value="January" class="">January</option>
                            <option value="February" class="">February</option>
                            <option value="March" class="">March</option>
                            <option value="April" class="">April</option>
                            <option value="May" class="">May</option>
                            <option value="June" class="">June</option>
                            <option value="July" class="">July</option>
                            <option value="August" class="">August</option>
                            <option value="September" class="">September</option>
                            <option value="October" class="">October</option>
                            <option value="November" class="">November</option>
                            <option value="December" class="">December</option>
                        </select>
                        <select class="days" onChange={this.handleChange}>
                            <option value="Day" class="">Day</option>
                            {day}
 
                        </select>
                        <select class="hours" onChange={this.handleChange}>
                            <option value="Time" class="">Time</option>
                            <option value="10am" class="">10:00am</option>
                            <option value="1030am" class="">10:30am</option>
                        </select>
                        </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <textarea class="form-control" placeholder="Your Message *" id="message" required data-validation-required-message="Please enter a message."></textarea>
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-lg-12 text-center">
                                <div id="success"></div>
                                <button type="submit" class="btn btn-xl">Book now</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
		);
	}
}
