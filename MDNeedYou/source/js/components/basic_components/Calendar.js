import React from 'react';
import { Glyphicon, Col, Row } from 'react-bootstrap';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import { connect } from "react-redux"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import { deleteAppointment } from "../../actions/reservationAction";
import { schedule, getReservation, fetchHours } from "../../actions/reservationAction"
import removeValue from "remove-value"

@connect(store => ({
    business: store.business.business,
    reservation: store.reservation.reservation,
    hours: store.hours.hours,
}))
export default class Calendar extends React.Component {
    constructor(props, context) {

        super(props, context);
        this.context = context;
        this.state = {
            events: this.props.reservation && this.handlEvents(),
            date: '',
            id: this.props.business.businessId,
            time: '',
            name: '',
            email: '',
            phone: '',
            message: '',
            status: true,
            event: '',
            reservationId: '',
            delete: {
                display: 'none'
            },
            reservationSelected:'',
            isUpdate: false


        };
        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );
    }

    handleSelectSlot({start, end}) {
        //create an event with title "Test"
        console.log("handleSelectSlot: " + start + " - " + end);
        //this.state.events.push({ start: start, end: end, title: "Test" });
        //this.setState({});
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

    getHours(date) {
        const post = {
            id: this.props.business.businessId,
            date: date,
        }
        this.props.dispatch(fetchHours(post));
        this.setState({ date: date });
        this.setState({ id: this.props.business.businessId });
    }


    onNavigate() {

    }

    onView(e) {

    }

    onChange(e) {
        debugger
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === 'date') {
            let d = new Date(e.target.value);
            this.getHours(e.target.value);
        }
    }

    handleSelectEvent(event) {
        this.setState({ event: event })
        this.getReservation(event);
        $(this.delete).show();
        $(this.information).show();
    }

    EventWeek(props) {
        return <strong>{props.event.title}</strong>
    }

    EventAgenda(props) {
        return <em>{props.event.title}</em>
    }

    addAppointment(e) {
        e.preventDefault();
        this.props.dispatch(schedule(this.state));
        $(this.modalAdd).modal('hide');
    }

    deleteAppointment() {
        let post={
            id: this.state.id,
            reservationId: this.state.event.title.split('-')[1]
        }
        this.event !== '' && this.props.dispatch(deleteAppointment(post));
        $(this.delete).hide();
        $(this.information).hide();
    }

    fixDayCalendar(date) {
        let day = Number(date.split("-")[2]);
        let month = Number(date.split("-")[1]);
        let year = date.split("-")[0];
        //day = (day !== 30 && day !== 31) ? day + 1 : day;
        //day = day>31 ? 31: day;
        let dayFixed = day < 10 ? `0${day}` : day;
        debugger
        return `${year}-${month}-${dayFixed}`;
    }

    getReservation(res) {
        let reservation = res.title.split('-')[1];
        debugger
        for (let i of this.props.reservation) {
            if (Number(reservation) === i.reservationId) {
                this.setState({reservationSelected : i});
                break;
            }
        }
    }

    handlEvents() {
        let event = []
        for (let i of this.props.reservation) {
            let date = this.fixDayCalendar(i.date);
            debugger
            event.push({ start: date, end: date, title: `${i.user.name}-${i.reservationId}` });
        }
        return event
    }

    render() {
        const arr = this.createHours();
        const hours = (!arr.length) ? [] : arr.map(
            (d, index) => <option key={index} value={d} class="">{d}</option>
        );
        return (<div>
            <button class="btn btn-success" data-toggle="modal" data-target={"#add"} id="searchList">Add Appoitment <i class="fa fa-plus" aria-hidden="true"></i></button>
            <button class="btn btn-danger" data-toggle="modal" style={this.state.delete} ref={(button) => { this.delete = button; } } data-target={"#delete"} id="searchList">Delete Appoitment <i class="fa fa-trash-o" aria-hidden="true"></i></button>
            <div class="alert alert-info" role="alert" style={this.state.delete} ref={(div) => { this.information = div; } } >
                <strong>Appointment Number:</strong> {this.state.reservationSelected && this.state.reservationSelected.reservationNumber}<br/>
                <strong>Name:</strong> {this.state.reservationSelected && this.state.reservationSelected.user.name}<br/>
                <strong>Email:</strong> {this.state.reservationSelected && this.state.reservationSelected.user.email}<br/>
                <strong>Phone:</strong> {this.state.reservationSelected && this.state.reservationSelected.user.phone}<br/>
                <strong>Message:</strong> {this.state.reservationSelected && this.state.reservationSelected.comment}<br/>
                <strong>Time:</strong> {this.state.reservationSelected && this.state.reservationSelected.time}<br/>
                <strong>Status:</strong> {this.state.reservationSelected && this.state.reservationSelected.status}<br/>
            </div>
            <BigCalendar
                selectable
                popup
                timeslots={1}
                events={this.handlEvents()}
                onNavigate={this.onNavigate.bind(this)}
                onView={this.onView.bind(this)}
                onSelectSlot={this.handleSelectSlot.bind(this)}
                onSelectEvent={this.handleSelectEvent.bind(this)}
                defaultDate={new Date()}
                eventPropGetter={e => ({ className: 'test-class' })} /* Here you can define a style for the element */
                components={{
                    event: this.EventWeek,
                    agenda: {
                        event: this.EventAgenda
                    }
                }}
                />

            <div class="modal fade" id="add" tabIndex="-1" ref={(div) => { this.modalAdd = div; } } role="dialog" aria-labelledby="edit" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                            <h4 class="modal-title custom_align" id="Heading">Appointment Details</h4>
                        </div>
                        <form autoComplete="off" role="form" onSubmit={this.addAppointment.bind(this)}>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Name*</label>
                                    <input class="form-control" name="name" onChange={this.onChange.bind(this)} type="text" required />
                                </div>
                                <div class="form-group">
                                    <label>Email*</label>
                                    <input class="form-control" name="email" onChange={this.onChange.bind(this)} type="email" required />
                                </div>
                                <div class="form-group">
                                    <label>Phone*</label>
                                    <input class="form-control" name="phone" onChange={this.onChange.bind(this)} required />
                                </div>
                                <div class="form-group">
                                    <label>Date*</label>
                                    <input class="form-control" name="date" onChange={this.onChange.bind(this)} type="date" required />
                                </div>
                                <div class="form-group">
                                    <label>Time*</label>
                                    <select class="hours pull-right" class="form-control" name="time" onChange={this.onChange.bind(this)} type="time" required >
                                        <option value="" ></option>
                                        {hours}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Comment</label>
                                    <input class="form-control" name="message" onChange={this.onChange.bind(this)} />
                                </div>
                            </div>
                            <div class="modal-footer ">
                                <button class="btn btn-success btn-lg"  ><span class="glyphicon glyphicon-ok-sign"></span>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="delete" tabIndex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                            <h4 class="modal-title custom_align" id="Heading">Delete this appointment"</h4>
                        </div>
                        <div class="modal-body">

                            <div class="alert alert-warning"><span class="glyphicon glyphicon-warning-sign"></span> Are you sure you want to delete <strong>{this.state.event.title}'s</strong> appointment?</div>

                        </div>
                        <div class="modal-footer ">
                            <button type="button" onClick={this.deleteAppointment.bind(this)} class="btn btn-success" data-dismiss="modal" ><span class="glyphicon glyphicon-ok-sign"></span> Yes</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> No</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        )
    }
}