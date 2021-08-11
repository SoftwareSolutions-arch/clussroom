import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { SharedServiceService } from '../../shared-service.service'
import { UtilService } from '../../../providers/util.service';
import { EventInput } from '@fullcalendar/angular';
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
    events: []
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
  allRemainderData: any = '';
  clickInfoDetails: any = '';
  editCalendarData: any = '';
  selectedEditCourse: any = ''
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

  confirmRemainder() {
    if(this.editCalendarData.remainderType =='' ||  this.editCalendarData.title  =='' ||  this.editCalendarData.time  =='' ||  this.editCalendarData.date  =='' ||  this.selectedClass.nid==''){
      this.util.errorAlertPopup('Please enter all the details');
    }

    else {
      let params = {
        "reminder_type": this.editCalendarData.reminder_type,
        "reminder_note": this.editCalendarData.reminder_note,
        "reminder_time": this.editCalendarData.reminder_time,
        "reminder_date": this.editCalendarData.reminder_date,
        "level": this.selectedEditCourse.field_level_id,
        "course_id": this.selectedEditCourse.nid,
        "class_id": this.selectedClass.nid,
        "class_code": this.selectedEditCourse.field_course_code,
        "banding": this.selectedEditCourse.field_banding_id,
        "reminder_id": this.clickInfoDetails.publicId
      }
      
      this.isLoadingBool = true;
      this.service.post('edit-calendar-remindar', params, 1).subscribe(result => {
        
        this.getAllRemainder();
        this.isLoadingBool = false;
      })
    }   
  }


  // add calendar model
  confirmModel() {
    if(this.editCalendarData.remainderType =='' ||  this.editCalendarData.title  =='' ||  this.editCalendarData.time  =='' ||  this.editCalendarData.date  =='' ||  this.selectedClass.nid==''){
      this.util.errorAlertPopup('Please enter all the details');
    }

    else {
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
      
      this.isLoadingBool = true;
      this.service.post('add-calendar-remindar-api', params, 1).subscribe(result => {
        
        this.getAllRemainder();
        this.isLoadingBool = false;
      })
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    
    this.clickInfoDetails = clickInfo.event._def;
    this.getCalendarListing()
    this.display1 = 'block';
  }

  deleteModelData() {
    // this.clickInfo.event.remove();
    let params = {
      "reminder_id": ''
    }
    
    this.isLoadingBool = true;
    this.service.post('delete-calendar-remindar', params, 1).subscribe(result => {
      this.getAllRemainder();
      this.isLoadingBool = false;
    })
  }

  closeModalDialogs() {
    this.display1 = 'none';
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  closeModalDialog() {
    this.display = 'none';
  }

  getAllRemainder() {
    let params = {
      "user_id": this.userId
    }
    
    this.isLoadingBool = true;
    this.service.post('user-calendar-remindar-listing', params, 1).subscribe(result => {
      
      this.isLoadingBool = false;
      this.allRemainderData = result.result;
      let data: any = []
      this.allRemainderData.forEach(element => {
        data.push({
          id: element.reminder_id,
          title: element.reminder_note,
          date: element.reminder_date
        })
      });
      this.calendarOptions.events = data;
    })
  }

  // get all courses list
  getAllCoursesList() {
    this.isLoadingBool = true;
    this.service.post('view-all-courses-api', '', 1).subscribe(result => {
      this.isLoadingBool = false;
      // this.allCourseList = result['coursesdata'];
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
    let params = {
      "course_id": this.selectedCategory.nid
    }
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
  }

  selectedClassList(){
    
  }

  viewAllEditCourses() {
    let params = {
      "course_id": this.selectedEditCourse.nid
    }
    
    this.isLoadingBool = true;
    this.service.post('view-all-classes-api', params, 1).subscribe(result => {
      
      this.isLoadingBool = false;
      if (result['status'] == 1) {
        this.allClassesData = result['classesdata'];
      }
      else {
        this.util.errorAlertPopup(result['message']);
      }
    })
  }

  getCalendarListing() {
    
    let params = {
      "reminder_id": this.clickInfoDetails.publicId
    }
    
    this.isLoadingBool = true;
    this.service.post('calendar-remindar-listing', params, 1).subscribe(result => {
      
      this.editCalendarData = result.result;
      this.isLoadingBool = false;
    })
  }
}