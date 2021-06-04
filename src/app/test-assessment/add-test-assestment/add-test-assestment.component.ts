import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from '../../shared-service.service';
import { UtilService } from '../../../providers/util.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-test-assestment',
  templateUrl: './add-test-assestment.component.html',
  styleUrls: ['./add-test-assestment.component.css']
})
export class AddTestAssestmentComponent implements OnInit {
  empForm: FormGroup;
  isChecked: boolean;
  myCheckbox: boolean;
  rubricChecked: boolean
  id: string;
  updateNewData: any;
  assignment_id: void;
  questionButton: boolean = true;
  sumData: any;
  public controls = {};
  ages = [];
  pointsData = [];
  finalData: any = '';
  data: any[];
  newData: number;
  listingData = [];
  constructor(private service: SharedServiceService, private router: Router, private route: ActivatedRoute, private util: UtilService, private toster: ToastrService, private fb: FormBuilder) {
    this.empForm = this.fb.group({
      employees: this.fb.array([]),
      rubric_title: new FormControl('',)
    });

    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.editData();
    this.addInitialForm();
  }

  addData() {
    if (this.id) {
      this.updateAssignment()
    } else {
      this.addAssignment();
    }
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

  addAssignment() {
    var x = new Date(this.addAssignmentForm.value.available_date);
    var y = new Date(this.addAssignmentForm.value.available_dateTo);
    if (x > y) {
      this.util.errorAlertPopup('start date should be less than end date');
    } else {
      var date = String(this.addAssignmentForm.value.available_date + " " + this.addAssignmentForm.value.available_time)
      var fromData = String(this.addAssignmentForm.value.available_dateTo + " " + this.addAssignmentForm.value.available_timeTo)
      const data = {
        "assignment_name": this.addAssignmentForm.value.assignment_name,
        "instruction": this.addAssignmentForm.value.instruction,
        "assignment_available_to": fromData,
        "assignment_available_from": date,
        "allow_attachments": this.addAssignmentForm.value.attachment_limit_checked,
        "character_limit": this.addAssignmentForm.value.character_limit_checked,
        "insert_limit": this.addAssignmentForm.value.character_limit,
        "allow_limit_attachments": this.addAssignmentForm.value.attachment,
        "insert_rubric": this.addAssignmentForm.value.rubric,
        "rubric": "",
        "points": this.addAssignmentForm.value.points,
        "rubric_select": 299,
        "class_nid": localStorage.getItem('classListId')
      }
      this.service.post('add-assignment-api', data, 1).subscribe(res => {
        if (res.status == '1') {
          this.util.showSuccessAlert('Assignment added successfully');
          this.assignment_id = sessionStorage.setItem('assignment_id', res.assignment_id)
          this.questionButton = false;
          // this.router.navigate(['/assignment/test-assignment-home']);
        }
      })
    }
  }

  // patch data in add form
  editData() {
    const data = {
      "assignment_id": this.id
    }
    this.service.post('listing-assignment', data, 1).subscribe(res => {
      this.updateNewData = res.assignment_data;
      this.addAssignmentForm.patchValue({
        // "level": this.updateNewData.level_id,
        "assignment_name": this.updateNewData.assignment_name,
        "instruction": this.updateNewData.assignment_instruction,
        "available_date": this.updateNewData.start_date,
        "available_time": this.updateNewData.start_time,
        "available_dateTo": this.updateNewData.end_date,
        "available_timeTo": this.updateNewData.end_time,
        "attachment_limit_checked": this.updateNewData.allow_attachments,
        "character_limit_checked": this.updateNewData.character_limit,
        "character_limit": this.updateNewData.character_insert_limit,
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
        if (res.status == '1') {
          this.util.showSuccessAlert('Assignment update successfully');
          this.goToQuestion();
          this.questionButton = false;
          // this.router.navigate(['/assignment/test-assignment-home']);
        }
      })
    }
  }
  goToQuestion() {
    this.router.navigate(['/assignment/assignment-question'], { queryParams: { id: this.assignment_id } });
  }

  // add rubric form
  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }
  newEmployee(): FormGroup {
    return this.fb.group({
      critterion: '',
      scale: this.fb.array([])
    });
  }

  addInitialForm() {
    this.addEmployee();
    this.addEmployeeSkill(this.employees().controls.length - 1);
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }
  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }
  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }
  employeeSkills(empIndex: number): FormArray {
    return this.employees()
      .at(empIndex)
      .get('scale') as FormArray;
  }
  newSkill(): FormGroup {
    return this.fb.group({
      text: '',
      value: ''
    });
  }
  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  addRubric() {
    const titleForm = this.employees().getRawValue();
    
    
    const data = {
      "type": "add",
      "critterion_input": titleForm,
      "number": this.listingData,
      "rubric_title": this.empForm.value.rubric_title,
      // "scale_text": {"1":["1"],"2":["3"]},
      // "scale_value":{"1":["2"],"2":["4"]}
    }
    // this.service.post('rubric-api',data,1).subscribe(res => {

    // })
  }
  sum(i) {
    this.pointsData = [];
    
    this.empForm.value.employees.forEach(element => {
      this.pointsData = [];
      this.finalData='';
      this.listingData=[]
      element.scale.forEach(element1 => {
        this.pointsData.push(element1.value)
        this.finalData = Math.max(...this.pointsData);
      });
      this.listingData.push(this.finalData)

      
      
      
    });
  }

}
