import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import { TimeZoneService } from '../time-zone.service';
// import moment from 'moment-timezone';
import * as moment from 'moment-timezone'

import { Moment } from 'moment';
@Component({
  selector: 'app-edit-teacher-profile',
  templateUrl: './edit-teacher-profile.component.html',
  styleUrls: ['./edit-teacher-profile.component.css']
})
export class EditTeacherProfileComponent implements OnInit {
  imageSrc: string;
  isLoadingBool: boolean = false;
  userData: any;
  imageData: any;
  levelData: any;
  private format = 'LLL Z z';
  private dateFormat = 'L';
  private timeFormat = 'LTS';
  public selectedTz: string;
  public tzNames: string[];

  public userTz: string;
  public utcTz: string;
  public displayTz: string;

  public selectedLocale: string;

  public date: moment.Moment;
  public fromNow: string;
  private num = 1416116057190;

  public a: moment.Moment;
  public aFormat: string;
  public aUtcFormat: string;
  public aDateFormat: string;
  public aTimeFormat: string;
  public aSpecialFormat: string;

  public tenantDateTime: Moment;
  public tenantDateTimeFormatted: Moment;

  public utcDateTime: Moment;

  constructor(private service: SharedServiceService, private util: UtilService, private router: Router,  @Inject('TimeZoneService') private timeZoneService: TimeZoneService) {
    this.tzNames = moment.tz.names();
   }

  ngOnInit() {
    this.getData();
    this.getLevel();
  }
  editForm = new FormGroup({
    firstName: new FormControl('',),
    lastName: new FormControl('',),
    email: new FormControl('',),
    image: new FormControl('',),
    fileSource: new FormControl('',),
  })

  editProfile() {
    this.isLoadingBool = true
    const data = {
      "user_id": localStorage.getItem('uid'),
      "first_name": this.editForm.value.firstName,
      "last_name": this.editForm.value.lastName,
      "email": "",
      "school_name": this.instructionsForm.value.instituteName,
      "instruction_name": this.instructionsForm.value.instruction,
      "timezone": this.timezoneForm.value.timeZone,
      "image": this.imageSrc

    }
    this.service.post('edit-profile-api', data, 1).subscribe(res => {
      this.isLoadingBool = false;
      if (res.result == 'success') {
        this.util.showSuccessAlert('Profile Uploaded Successfully')
        setTimeout(() => {
          this.router.navigateByUrl('/teacher-profile');
        }, 1000);
      }
    })
  }
  // upload image
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.editForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }
  //  patch data
  getData() {
    const data = {
      "user_id": localStorage.getItem('uid')
    }
    this.service.post('user-profile-api', data, 1).subscribe(res => {
      this.userData = res.result
      this.imageData = res.result.avatar
      this.editForm.patchValue({
        firstName: this.userData.firstname,
        lastName: this.userData.lastname,
        //  image: this.userData.avatar,
        email: this.userData.email
      })
      this.instructionsForm.patchValue({
        instituteName: this.userData.school_name,
        instruction: this.userData.tid
      })
      this.timezoneForm.patchValue({
         timeZone: this.userData.timezone
      })
    })
  }
  //  get instruction data
  getLevel() {
    const data = {
      id: '1'
    }
    this.service.post('instruction-name-list-api', data, 1).subscribe(res => {
      this.levelData = res
    })
  }


  instructionsForm = new FormGroup({
    instituteName: new FormControl('',),
    instruction: new FormControl('',)
  })
  //  save Instructions and school/institute name
  saveInstruction() {
    this.isLoadingBool = true
    const data = {
      "user_id": localStorage.getItem('uid'),
      "first_name": this.editForm.value.firstName,
      "last_name": this.editForm.value.lastName,
      "email": "",
      "school_name": this.instructionsForm.value.instituteName,
      "instruction_name": this.instructionsForm.value.instruction,
      "timezone": this.timezoneForm.value.timeZone,
      "image": this.imageSrc

    }
    this.service.post('edit-profile-api', data, 1).subscribe(res => {
      this.isLoadingBool = false;
      if (res.result == 'success') {
        this.util.showSuccessAlert('Profile Uploaded Successfully')
        setTimeout(() => {
          this.router.navigateByUrl('/teacher-profile');
        }, 1000);
      }
    })
  }
   timeZoneChanged(timeZone: string): void {
    
    this.selectedTz = timeZone;

    this.updateTime(timeZone);
  }

  updateTime(timeZone: string): void {
    this.displayTz = timeZone;

    this.date = moment(this.num).utc();
    this.fromNow = this.date.fromNow();

    this.a = moment(this.num).tz(timeZone);

    this.aFormat = this.a.format(this.format); // 2013-11-18T19:55:00+08:00
    this.aDateFormat = this.a.format(this.dateFormat);
    this.aTimeFormat = this.a.format(this.timeFormat);
    this.aSpecialFormat = this.applySpecialFormat(this.a);

    this.timeZoneService.setTenantTimeZone(this.selectedTz);
    this.tenantDateTime = this.timeZoneService.utcToTenant(this.date);
    this.utcDateTime = this.timeZoneService.tenantToUtc(this.tenantDateTime);
    // this.tenantDateTimeFormatted = this.timeZoneService.utcToTenantString(this.date, 'LLL');
  }
  private applySpecialFormat(dateTime: moment.Moment): string {
    let special = dateTime.format('llll');
    let offset = dateTime.utcOffset();
    return special + ' ' + dateTime.tz();
  }

  // timezone api

  timezoneForm = new FormGroup({
    timeZone : new FormControl('',)
  })
  getTimeZone(){
    this.isLoadingBool = true
    const data = {
      "user_id": localStorage.getItem('uid'),
      "first_name": this.editForm.value.firstName,
      "last_name": this.editForm.value.lastName,
      "email": "",
      "school_name": this.instructionsForm.value.instituteName,
      "instruction_name": this.instructionsForm.value.instruction,
      "timezone": this.timezoneForm.value.timeZone,
      "image": this.imageSrc

    }
    this.service.post('edit-profile-api', data, 1).subscribe(res => {
      this.isLoadingBool = false;
      if (res.result == 'success') {
        this.util.showSuccessAlert('Profile Uploaded Successfully')
        setTimeout(() => {
          this.router.navigateByUrl('/teacher-profile');
        }, 1000);
      }
    })
  }
}
