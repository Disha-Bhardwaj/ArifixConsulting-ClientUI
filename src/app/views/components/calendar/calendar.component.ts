import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatepickerOptions } from 'ng2-datepicker';
import { ToastrService } from 'ngx-toastr';
import {
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/web-component';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '../../common/event-utils';


defineFullCalendarElement();
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class CalendarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  date: any
  options: DatepickerOptions = {};
  openDialog(value: any) {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: value,
      },
      autoFocus: false, 
      restoreFocus: false
    });
  }

  ngOnInit(): void {
    this.options= {
      placeholder: 'dd/mm/yyyy',
      format: 'dd/MM/yyyy',
      position: 'bottom',
      inputClass: 'dateIn',
    };
  }

  // calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: '',
      center: 'title',
      right: ''
    },
    initialView: 'timeGridDay',
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
  backDate(){
      this.date = new Date(this.date.setDate((this.date.getDate() - 1)));
 
  }
  nextDate(){
    console.log('hello')
    this.date = new Date(this.date.setDate((this.date.getDate() + 1)));
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
