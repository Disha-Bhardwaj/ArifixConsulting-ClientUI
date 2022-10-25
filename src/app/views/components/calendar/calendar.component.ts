import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
// import resourceTimelinePlugin from '@fullcalendar/';
import {
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/web-component';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '../../common/event-utils';
// import { INITIAL_EVENTS, createEventId } from '';


defineFullCalendarElement();
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openDialog(value: any) {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: value,
      },
    });
  }

  ngOnInit(): void {
  }

  // calendarVisible = true;
  calendarOptions: CalendarOptions = {
    // plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    // headerToolbar: {
    //   left: 'prev,next today',
    //   center: 'title',
    //   right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    // },
    // initialView: 'dayGridMonth',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    // weekends: true,
    // editable: true,
    // selectable: true,
    // selectMirror: true,
    // dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: '',
      center: 'title',
      right: ''
    },
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    // weekends: true,
    // editable: true,
    // selectable: true,
    // selectMirror: true,
    // dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];

  // handleCalendarToggle() {
  //   this.calendarVisible = !this.calendarVisible;
  // }

  handleWeekendsToggle() {
    this.calendarOptions = {
      ...this.calendarOptions,
      weekends: !this.calendarOptions.weekends
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
