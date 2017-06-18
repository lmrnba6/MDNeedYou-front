import React from 'react';
import { Glyphicon, Col, Row } from 'react-bootstrap';
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
//import Events from 'Events.jsx'; // https://github.com/jquense/react-big-calendar/blob/master/examples/events.js 

export default class Calendar extends React.Component {
    constructor(props, context)
    {
        super(props, context);
        this.context = context;
        this.state = {events: []};
        BigCalendar.setLocalizer(
                BigCalendar.momentLocalizer(moment)
        );
    }

    handleSelectSlot({start, end})
    {
        //create an event with title "Test"
        console.log("handleSelectSlot: " + start + " - " + end);
        this.state.events.push({start: start, end: end, title: "Test"});
        this.setState({});

    }

    handleSelectEvent()
    {
        //just for example
        console.log("handleSelectEvent: " + JSON.stringify(arguments));
    }

    EventWeek(props)
    {
        return <strong>{props.event.title}</strong>
    }

    EventAgenda(props)
    {
        return <em>{props.event.title}</em>
    }

    render()
    {
        return (<div>
                <BigCalendar
                        selectable
                        popup
                        events={this.state.events}
                        onSelectSlot={this.handleSelectSlot.bind(this)}
                        onSelectEvent={this.handleSelectEvent.bind(this)}
                        defaultDate={new Date(2015, 3, 1)}
                        eventPropGetter={e => ({ className: 'test-class'})} /* Here you can define a style for the element */
                        components={{
              event: this.EventWeek,
              agenda: {
                event: this.EventAgenda
              }
            }}
                        />
        </div>);
    }
}