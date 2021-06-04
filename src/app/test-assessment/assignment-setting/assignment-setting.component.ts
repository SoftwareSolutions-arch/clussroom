import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-assignment-setting',
  templateUrl: './assignment-setting.component.html',
  styleUrls: ['./assignment-setting.component.scss']
})
export class AssignmentSettingComponent implements OnInit {
  
  disbled: boolean = true;
  id: string;
  updateNewData: any;
  isChecked: boolean;
  myCheckbox: boolean;
  rubricChecked: boolean
  questionButton: boolean;
  assignment_id: string;
  constructor(private route: ActivatedRoute,private service: SharedServiceService, private util: UtilService,private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
   }

  ngOnInit() {
    this.editData();
    this.addAssignmentForm.disable();
  }
  addAssignmentForm = new FormGroup({
    assignment_name: new FormControl('',),
    instruction: new FormControl('',),
    available_date: new FormControl('',),
    available_time: new FormControl('',),
    available_dateTo: new FormControl('',),
    available_timeTo: new FormControl('',),
    attachment: new FormControl('',),
    character_limit: new FormControl('',),
    character_limit_checked: new FormControl('',),
    rubric: new FormControl('',),
    points: new FormControl('',),
    attachment_limit_checked: new FormControl('',)

  })
edit(){
  this.disbled = false
  this.addAssignmentForm.enable();
}
  // patch data in add form
  editData() {
    const data = {
      "assignment_id": this.id
    }
    this.service.post('listing-assignment', data, 1).subscribe(res => {
      // 
      this.updateNewData = res.assignment_data;
      // 
      this.addAssignmentForm.patchValue({
        // "level": this.updateNewData.level_id,
        "assignment_name": this.updateNewData.assignment_name,
        "instruction": this.updateNewData.assignment_instruction,
        "available_date": this.updateNewData.start_date,
        "available_time": this.updateNewData.start_time,
        available_dateTo: this.updateNewData.end_date,
        available_timeTo: this.updateNewData.end_time,
        "attachment_limit_checked": this.updateNewData.allow_attachments,
        "character_limit_checked": this.updateNewData.character_limit,
        "character_limit": this.updateNewData.insert_limit,
        "attachment": this.updateNewData.allow_limit_attachments,
        "rubric": this.updateNewData.insert_rubric,
        // rubric: this.updateNewData.rubric,
        points: this.updateNewData.points,
        // rubric_select: this.updateNewData. rubric_select,
        "class_nid": localStorage.getItem('classListId')
      })
    }
    )
  }

  // update data 
  updateAssignment() {
    var x = new Date(this.addAssignmentForm.value.available_date);
    var y = new Date(this.addAssignmentForm.value.available_dateTo);
    if (x > y) {
      this.util.errorAlertPopup('start date should be less than end date');
    } else {
      var date = String(this.addAssignmentForm.value.available_date + " " + this.addAssignmentForm.value.available_time)
      var fromData = String(this.addAssignmentForm.value.available_dateTo + " " + this.addAssignmentForm.value.available_timeTo)
      const data = {
        "assignment_id": this.id,
        "assignment_name": this.addAssignmentForm.value.assignment_name,
        "instruction": this.addAssignmentForm.value.instruction,
        "assignment_available_to": fromData,
        "assignment_available_from": date,
        "allow_attachments": this.addAssignmentForm.value.attachment_limit_checked,
        "character_limit": this.addAssignmentForm.value.character_limit_checked,
        "insert_limit": this.addAssignmentForm.value.character_limit,
        allow_limit_attachments: this.addAssignmentForm.value.attachment,
        "insert_rubric": this.addAssignmentForm.value.rubric,
        "rubric": "",
        "points": this.addAssignmentForm.value.points,
        "rubric_select": 299,
        "class_nid": localStorage.getItem('classListId')
      }
      this.service.post('update-assignment-api', data, 1).subscribe(res => {
        
        if (res.status =='1') {
          this.util.showSuccessAlert('Assignment update successfully');
         this.goToQuestion();
          this.questionButton = false;
          // this.router.navigate(['/assignment/test-assignment-home']);
        }
      })
    }
  }
  goToQuestion(){
    this.assignment_id = sessionStorage.getItem('assignment_id')
    this.router.navigate(['/assignment/assignment-question'], { queryParams: { id: this.id} });
  }
}
