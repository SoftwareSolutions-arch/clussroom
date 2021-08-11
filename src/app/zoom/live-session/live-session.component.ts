import { identifierName } from '@angular/compiler';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-live-session',
  templateUrl: './live-session.component.html',
  styleUrls: ['./live-session.component.css']
})
export class LiveSessionComponent implements OnInit {
  @ViewChild('closeSchedule') closeSchedule;
  @ViewChild('closeZom') closeZom;
  @ViewChild('closeMetting') closeMetting;
  @ViewChild('closeUpdateSchedule') closeUpdateSchedule;
  @ViewChild('closeEditSchedule') closeEditSchedule
  liveData: any;
  href: string;
  learnerData: any;
  learnerList: boolean = false;
  scheduleMetting: boolean = false;
  newMetting: boolean = false;
  getAll: any = [];
  editData: any;
  pid: any;
  mttingId: any;
  time: any;
  times: any;
  timezoneData: any;
  cloneOrders: any[];
  end: boolean = false;
  start = true;
  hour: any;
  isLoadingBool = true;
  lernerId: any =[];
  permissionButton: boolean = false;
  mttingsId: any;
  editButton: boolean = false;
  codeId: any;

  constructor(private service: SharedServiceService, private router: Router, private util: UtilService,private route:ActivatedRoute) {
    if(localStorage.getItem('live_session_permission') == '1'){
      this.permissionButton = true
    }else{
      this.permissionButton = false
    }

  }

  ngOnInit(): void {
    this.liveSession();
    this.getAllLearners();
    this.getMettingId();
    this.getTimezone();
  }
  myFunction() {
    document.getElementById("myDropdown").classList.toggle("zoom-show");
  }

  liveSession() {
    const data = {
      class_id: '767'
    }
    this.service.post('meeting-list', data, 1).subscribe(res => {
      this.isLoadingBool = false;
      this.liveData = res.meeting_list
    })
  }
  // delete metting

  mettingDelete(id) {
    this.isLoadingBool = true
    const data = {
      meetingid: id
    }
    this.service.post('delete-meeting', data, 1).subscribe(res => {
      this.isLoadingBool = false
      if (res.status == 1) {
        this.util.showSuccessAlert('Metting deleted')
        this.liveSession();
      }
    })
  }
  un() {
    this.end = true
    this.start = false;

  }
  // start vedio tab open with url
  startVedio(e) {
    this.un()
    setTimeout(() => {
      window.open(e, "_blank");
    }, 10000);

  }

  // sceduleForm
  scheduledForm = new FormGroup({
    topic: new FormControl('',),
    date: new FormControl('',),
    time: new FormControl('',),
    hour: new FormControl('',),
    minute: new FormControl('',),
    timezone: new FormControl('',),
    eneratedId: new FormControl('',),
    passcode: new FormControl('',),
    waiting: new FormControl('',),
    host: new FormControl('',),
    participants: new FormControl('',),
    allow_participants_anytime: new FormControl('',),
    mute_upon_entry: new FormControl('',),
    auto_recording: new FormControl('',),
    selected_meeting_participants: new FormControl('',),
    meeting_participants: new FormControl('',)
  })
  hourData(time) {
    this.hour = time
  }
  scheduleSubmit() {
    this.isLoadingBool = true;
    var dateTime = this.scheduledForm.value.date.concat('T' + this.scheduledForm.value.time + ':00');
    let minutes = this.hour * 60;
    var i = minutes;
    var j = this.scheduledForm.value.minute;
    var timedurations = Number(i) + Number(j)
    const data = {
      "type": "schedule",
      "class_id": 767,
      "topic": this.scheduledForm.value.topic,
      "start_time": dateTime,
      "duration": timedurations,
      "password": this.scheduledForm.value.passcode,
      "timezone": this.scheduledForm.value.timezone,
      "host_video": this.scheduledForm.value.host,
      "praticipants": this.scheduledForm.value.participants,
      "allow_participants_anytime": this.scheduledForm.value.allow_participants_anytime,
      "mute_upon_entry": this.scheduledForm.value.mute_upon_entry,
      "auto_recording": this.scheduledForm.value.auto_recording,
      meeting_participants: this.getAll,
      meetingid: this.scheduledForm.value.eneratedId,
      waiting_room: this.scheduledForm.value.waiting,
      selected_meeting_participants: this.lernerId
    }
    this.service.post('create-meeting', data, 1).subscribe(res => {
      this.closeSchedule.nativeElement.click();
      this.closeZom.nativeElement.click();
      this.isLoadingBool = false;
      if (res.status == 1) {
        this.scheduledForm.reset();
        this.util.showSuccessAlert('Meeting added successfully')
        this.liveSession();
      }
    })
  }
  newMettingSubmit() {
    this.isLoadingBool = true;
    var dateTime = this.scheduledForm.value.date.concat('T' + this.scheduledForm.value.time + ':00');
    let minutes = this.hour * 60;
    var i = minutes;
    var j = this.scheduledForm.value.minute;
    var timedurations = Number(i) + Number(j)
    const data = {
      "type": "meeting",
      "class_id": 767,
      "topic": this.scheduledForm.value.topic,
      "start_time": '',
      "duration": timedurations,
      "password": this.scheduledForm.value.passcode,
      "timezone": this.scheduledForm.value.timezone,
      "host_video": this.scheduledForm.value.host,
      "praticipants": this.scheduledForm.value.participants,
      "allow_participants_anytime": this.scheduledForm.value.allow_participants_anytime,
      "mute_upon_entry": this.scheduledForm.value.mute_upon_entry,
      "auto_recording": this.scheduledForm.value.auto_recording,
      meeting_participants: this.getAll,
      meetingid: this.scheduledForm.value.eneratedId,
      waiting_room: this.scheduledForm.value.waiting,
      selected_meeting_participants: this.lernerId
    }
    this.service.post('create-meeting', data, 1).subscribe(res => {
      this.isLoadingBool = false;
      this.closeMetting.nativeElement.click();
      this.closeZom.nativeElement.click();
      if (res.status == 1) {
        this.util.showSuccessAlert('New metting added sucessfully')
        this.scheduledForm.reset();
        this.liveSession();
      }
    })
  }
  // get all courses list
  getAllLearners() {
    this.service.post('view-all-learners-api', '', 1).subscribe(result => {
      this.learnerData = result;
    })
  }

  // get learner radio button value
  getLearnerValue(e) {
    if (e == 'All learners') {
      for (const value of this.learnerData) {
        this.getAll.push(value.learner_id);
      }
      this.learnerList = false
    } else {
      if (e == 'Select learners') {
        this.getAll = []
        this.learnerList = true;
      }
    }
  }

  metting() {
    alert('')
    this.closeSchedule.nativeElement.click();
    this.closeEditSchedule.nativeElement.click();
    this.scheduleMetting = true;
    this.newMetting = false
  }

  newMettings() {
    this.closeMetting.nativeElement.click();
    this.scheduleMetting = false;
    this.newMetting = true
  }

  // get personal metting id
  getMettingId() {
    const data = {}
    this.service.post('zoom-user-details', data, 1).subscribe(res => {
      this.pid = res.pmi
    })
  }
  isCheckBoxClicked(testListing, i) {
    this.editButton = true;
    this.mttingsId = testListing.meeting_id;
  }
  // copy metting
  copyMettingData() {
    const data = {
      meeting_id_for_edit: this.mttingsId
    }
    this.service.post('details-for-update-meeting', data, 1).subscribe(res => {
      this.editData = res.data
      this.times = res.data.meeting_time
      var a = this.times.split("T");
      var date = a[0];
      var time = a[1];
      this.scheduledForm.patchValue({
        topic: this.editData.topic,
        date: date,
        time: time,
        hour: this.editData.meeting_duration_hour,
        minute: this.editData.meeting_duration_minutes,
        timezone: this.editData.time_zone,
        eneratedId: this.editData.meeting_id,
        passcode: this.editData.password,
        waiting: this.editData.waiting_room,
        host: String(this.editData.host_video),
        participants: String(this.editData.participants),
        allow_participants_anytime: this.editData.allow_participants_anytime,
        mute_upon_entry: this.editData.mute_upon_entry,
        auto_recording: this.editData.auto_recording,
        meeting_participants: this.editData.meeting_participants,
        selected_meeting_participants:this.editData.selected_meeting_participants
      })
    })

  }
  // edit schedule
  editScheludleData(id) {
    this.mttingId = id
    const data = {
      meeting_id_for_edit: id
    }
    this.service.post('details-for-update-meeting', data, 1).subscribe(res => {
      this.editData = res.data
      this.times = res.data.meeting_time
      var a = this.times.split("T");
      var date = a[0];
      var time = a[1];
      this.scheduledForm.patchValue({
        topic: this.editData.topic,
        date: date,
        time: time,
        hour: this.editData.meeting_duration_hour,
        minute: this.editData.meeting_duration_minutes,
        timezone: this.editData.time_zone,
        eneratedId: this.editData.meeting_id,
        passcode: this.editData.password,
        waiting: this.editData.waiting_room,
        host: String(this.editData.host_video),
        participants: String(this.editData.participants),
        allow_participants_anytime: this.editData.allow_participants_anytime,
        mute_upon_entry: this.editData.mute_upon_entry,
        auto_recording: this.editData.auto_recording,
        meeting_participants: this.editData.meeting_participants,
        selected_meeting_participants:this.editData.selected_meeting_participants
      })
    })

  }
  updateSchedule() {
    this.isLoadingBool = true;
    var dateTime = this.scheduledForm.value.date.concat('T' + this.scheduledForm.value.time);
    if(dateTime){
      var newData = dateTime
    }else{
      var newData = this.times
    }
    let minutes = this.hour * 60;
    var i = minutes;
    var j = this.scheduledForm.value.minute;
    var timedurations = Number(i) + Number(j)
    const data = {
      "meeting_id_for_edit": this.mttingId,
      "type": "schedule",
      "class_id": 767,
      "topic": this.scheduledForm.value.topic,
      "start_time": newData,
      "duration": '60',
      "password": this.scheduledForm.value.passcode,
      "timezone": this.scheduledForm.value.timezone,
      "host_video": this.scheduledForm.value.host,
      "praticipants": this.scheduledForm.value.participants,
      "allow_participants_anytime": this.scheduledForm.value.allow_participants_anytime,
      "mute_upon_entry": this.scheduledForm.value.mute_upon_entry,
      "auto_recording": this.scheduledForm.value.auto_recording,
      meeting_participants: this.getAll,
      meetingid: this.scheduledForm.value.eneratedId,
      waiting_room: this.scheduledForm.value.waiting,
      selected_meeting_participants: this.lernerId

    }
    this.service.post('update-meeting', data, 1).subscribe(res => {
      this.isLoadingBool = false
      this.closeUpdateSchedule.nativeElement.click();
      this.closeEditSchedule.nativeElement.click();

      if (res.status == 1) {
        this.util.showSuccessAlert('Metting updated sucessfully')
        this.liveSession();
      }
    })
  }

  // time zone api
  getTimezone() {
    const data = {

    }
    this.service.post('time-zone-list', data, 1).subscribe(res => {
      this.timezoneData = res.time_zones
    })
  }
  setOrders() {
    this.cloneOrders = [...this.liveData];
    
  }
  // end metting api
  endMetting() {
    this.isLoadingBool = true
    const data = {
      meeting_id_for_edit: '1029'
    }
    this.service.post('details-for-update-meeting', data, 1).subscribe(res => {
      this.isLoadingBool = false;
      this.end = false;
    })
  }

  // get selected lerners id
  leardersId(id){
    this.lernerId.push(id)
    this.getAll = []
  }

}
