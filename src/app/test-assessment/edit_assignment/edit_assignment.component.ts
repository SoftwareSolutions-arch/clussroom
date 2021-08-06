import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';


@Component({
  selector: 'app-edit_assignment',
  templateUrl: './edit_assignment.component.html',
  styleUrls: ['./edit_assignment.component.css']
})
export class Edit_assignmentComponent implements OnInit {
  isLoadingBool: boolean = false;
  disbled: boolean = true;
  id: string;
  updateNewData: any;
  isChecked: boolean;
  myCheckbox: boolean;
  rubricChecked: boolean
  questionButton: boolean;
  assignment_id: string;
  assignmentData: any;
  rubricList: any;
  rubricId: any;
  viewRubricData: any;
  rubricTitle: any;
  subCatSelected: boolean = false;
  submitted: boolean = false;
  selectedTestDetails: any = "";
  formDisabled = true;
  constructor(private route: ActivatedRoute, private service: SharedServiceService, private util: UtilService, private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.listRubric()
    this.editData();
    this.addAssignmentForm.disable();
    this.questionData();
    this.getAssignmentData();
  }
  getAssignmentData(){
    const data = {
     "class_id":localStorage.getItem('classListId') 
    }
    this.service.post('listing-assignment',data,1).subscribe(res => { 
      this.assignmentData = res.assignment_data
    })
  }
  addAssignmentForm = new FormGroup({
    assignment_name: new FormControl('', Validators.required),
    instruction: new FormControl('', Validators.required),
    available_date: new FormControl('', Validators.required),
    available_time: new FormControl('', Validators.required),
    available_dateTo: new FormControl('', Validators.required),
    available_timeTo: new FormControl('', Validators.required),
    attachment: new FormControl('',),
    character_limit: new FormControl('',),
    character_limit_checked: new FormControl('',),
    rubric: new FormControl('',),
    points: new FormControl('', Validators.required),
    attachment_limit_checked: new FormControl('',),
    rubric_select: new FormControl('',)

  })
  edit() {
    this.disbled = false
    this.formDisabled = false
    this.addAssignmentForm.enable();
  }
  oncahnge(){
    this.isLoadingBool = true;

    let params = {
    //  "class_id":localStorage.getItem('classListId') ,
      "assignment_id": this.selectedTestDetails.assignment_id
    }
    this.service.post('listing-assignment', params, 1).subscribe(res => {
      this.isLoadingBool = false;
      this.updateNewData = res.assignment_data
      this.addAssignmentForm.patchValue({
        "assignment_name": this.updateNewData.assignment_name,
        "instruction": this.updateNewData.assignment_instruction,
        "available_date": this.updateNewData.start_date,
        "available_time": this.updateNewData.start_time,
        "available_dateTo": this.updateNewData.end_date,
        available_timeTo: this.updateNewData.end_time,
        "attachment_limit_checked": this.updateNewData.allow_attachments,
        "character_limit_checked": this.updateNewData.character_limit,
        "character_limit": this.updateNewData.character_insert_limit,
        "attachment": this.updateNewData.allow_limit_attachments,
        "rubric": this.updateNewData.insert_rubric,
        // rubric: this.updateNewData.rubric,
        points: this.updateNewData.points,
        rubric_select: this.updateNewData.rubric_nid,
        "class_nid": localStorage.getItem('classListId')
      })
    })
  }
  // patch data in add form
  editData() {
    const data = {
      "assignment_id": this.id
    }
    this.service.post('listing-assignment', data, 1).subscribe(res => {
      this.updateNewData = res.assignment_data;
      this.addAssignmentForm.patchValue({
        "assignment_name": this.updateNewData.assignment_name,
        "instruction": this.updateNewData.assignment_instruction,
        "available_date": this.updateNewData.start_date,
        "available_time": this.updateNewData.start_time,
        "available_dateTo": this.updateNewData.end_date,
        available_timeTo: this.updateNewData.end_time,
        "attachment_limit_checked": this.updateNewData.allow_attachments,
        "character_limit_checked": this.updateNewData.character_limit,
        "character_limit": this.updateNewData.character_insert_limit,
        "attachment": this.updateNewData.allow_limit_attachments,
        "rubric": this.updateNewData.insert_rubric,
        // rubric: this.updateNewData.rubric,
        points: this.updateNewData.points,
        rubric_select: this.updateNewData.rubric_nid,
        "class_nid": localStorage.getItem('classListId')
      })
    }
    )
  }

  // update data 
  updateAssignment() {
    this.submitted = true;
    if (this.addAssignmentForm.invalid) {
      return;
    }
    this.isLoadingBool = true;
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
        "rubric_select": this.rubricId,
        "class_nid": localStorage.getItem('classListId')
      }
      this.service.post('update-assignment-api', data, 1).subscribe(res => {
        if (res.status == '1') {
          this.isLoadingBool = false;
          this.util.showSuccessAlert('Assignment updated successfully');
          this.goToQuestion();
          this.questionButton = false;
          // this.router.navigate(['/assignment/test-assignment-home']);
        }
      })
    }
  }
  goToQuestion() {
    this.assignment_id = sessionStorage.getItem('assignment_id')
    this.router.navigate(['/assignment/assignment-question'], { queryParams: { id: this.id, assignment_id: this.assignmentData } });
  }
  questionData() {
    const data = {
      assignment_id: this.id,
    }
    this.service.post('assignment-questions-listing', data, 1).subscribe(res => {
      this.assignmentData = res.result[0].id

    })
  }
  // rubric list api
  listRubric() {
    const data = {
      "type": "list",
    }
    this.service.post('rubric-api', data, 1).subscribe(res => {
      this.rubricList = res.rubric_title
    })
  }
  // get rubric id
  getRubricId(id) {
    this.rubricId = id
    if (id) {
      this.subCatSelected = true;
    }
  }
  // view rubric api
  viewRubric() {
    const data = {
      "type": "singlelist",
      "rubric_id": this.rubricId
    }
    this.service.post('rubric-api', data, 1).subscribe(res => {
      this.viewRubricData = res.rubric;
      this.rubricTitle = res.rubric_title;
    })
  }
}
