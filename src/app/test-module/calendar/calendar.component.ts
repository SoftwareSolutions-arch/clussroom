import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('newModel') private newModel: ElementRef;

  display1 = 'none'
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      right: 'prev,next today',
      // center: 'title',
      left: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  display = 'none'; //default Variable
  currentEvents: EventApi[] = [];

  fillData: any = {
    date: '',
    time: '',
    title: ''
  }
  selectDateTime: any = '';
  clickInfo: EventClickArg;
  constructor() { }

  ngOnInit(): void {
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

   handleDateSelect(selectInfo: DateSelectArg) {
    this.display = 'block'; //Set block css
    this.selectDateTime = selectInfo
  }

  confirmModel() {
    console.log(this.fillData)
    console.log(this.selectDateTime)
    const calendarApi = this.selectDateTime.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (this.fillData.title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: this.fillData.title,
        start: this.selectDateTime.startStr,
        end: this.selectDateTime.endStr,
        allDay: this.selectDateTime.allDay
      });
    }

  }


  handleEventClick(clickInfo: EventClickArg) {
    this.clickInfo=clickInfo
    this.display1 = 'block'
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }

  deleteModelData(){
    this.clickInfo.event.remove();
  }

  closeModalDialogs() {
    this.display1 = 'none';
  }

  handleEvents(events: EventApi[]) {
    console.log('handleEvents', events);
    this.currentEvents = events;
  }

  closeModalDialog() {
    // this.newModel.nativeElement.click();
    this.display = 'none';
  }
}
