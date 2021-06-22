import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import Swal from 'sweetalert2'
import { SharedServiceService } from '../../shared-service.service'
import { UtilService } from '../../../providers/util.service';

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
      center: 'title',
      left: 'dayGridMonth,timeGridWeek,timeGridDay',
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
    title: '',
    remainderType: ''
  }
  selectDateTime: any = '';
  clickInfo: EventClickArg;
  isLoadingBool: any = '';
  userId: any = '';
  allCourseList: any = '';
  selectedCategory: any = '';
  allClassesData: any = '';
  selectedClass: any = '';

  constructor(public service: SharedServiceService, public util: UtilService) {
    this.userId = localStorage.getItem('uid');
    this.getAllRemainder();
    this.getAllCoursesList();
  }

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
    let params = {
      "reminder_type": this.fillData.remainderType,
      "reminder_note": this.fillData.title,
      "reminder_time": this.fillData.time,
      "reminder_date": this.fillData.date,
      "level": this.selectedCategory.field_level_id,
      "course_id": this.selectedCategory.nid,
      "class_id": this.selectedClass.nid,
      "class_code": this.selectedCategory.field_course_code,
      "banding": this.selectedCategory.field_banding_id
    }
    console.log('params', params);
    this.isLoadingBool = true;
    this.service.post('add-calendar-remindar-api', params, 1).subscribe(result => {
      console.log('result', result);
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
      this.isLoadingBool = false;
    })

  }

  handleEventClick(clickInfo: EventClickArg) {
    this.clickInfo = clickInfo
    this.display1 = 'block'
  }

  deleteModelData() {
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
    this.display = 'none';
  }

  getAllRemainder() {
    let params = {
      "user_id": this.userId
    }
    console.log('params++++++', params);
    this.isLoadingBool = true;
    this.service.post('user-calendar-remindar-listing', params, 1).subscribe(result => {  
      console.log('result', result);
      this.isLoadingBool = false;
    })
  }

  addRemainder() {
    console.log('this.allClassesData', this.selectedClass);
    let params = {
      "reminder_type": this.fillData.remainderType,
      "reminder_note": this.fillData.title,
      "reminder_time": this.fillData.time,
      "reminder_date": this.fillData.date,
      "level": this.selectedCategory.field_level_id,
      "course_id": this.selectedCategory.nid,
      "class_id": this.selectedClass.nid,
      "class_code": this.selectedCategory.field_course_code,
      "banding": this.selectedCategory.field_banding_id
    }
    console.log('params', params);
    // this.isLoadingBool = true;
    // this.service.post('add-calendar-remindar-api', params, 1).subscribe(result => {
    //   console.log('result', result);
    //   this.isLoadingBool = false;
    // })
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      console.log('result', result)
      this.isLoadingBool = false;
      this.allCourseList = result['coursesdata'];
      if (result['status'] == 1) {
        this.allCourseList = result['coursesdata'];
      }
      else {
        this.util.errorAlertPopup(result['mesaage']);
      }
    })
  }

  // view classes
  viewAllCoursesList() {
    console.log('this.selectedCategory', this.selectedCategory);
    let params = {
      "course_id": this.selectedCategory.nid
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {
      console.log('viewAllCoursesList', result);
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
  }
}
