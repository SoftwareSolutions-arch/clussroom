import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-grade-weightage-setting',
  templateUrl: './grade-weightage-setting.component.html',
  styleUrls: ['./grade-weightage-setting.component.css']
})
export class GradeWeightageSettingComponent implements OnInit {
  @ViewChild('closeRubric') closeRubric;
  rubricId: any;
  subCatSelected: boolean = true;
  viewRubricData: any;
  rubricTitle: any;
  empForm: FormGroup;
  pointsData = [];
  finalData: any = '';
  listingData = [];
  rubricList: any;
  numberValues: any = [];
  constructor(private service: SharedServiceService, private router: Router, private route: ActivatedRoute, private util: UtilService, private toster: ToastrService, private fb: FormBuilder) {
    this.empForm = this.fb.group({
      employees: this.fb.array([]),
      rubric_title: new FormControl('',)
    });

  }

  ngOnInit() {
    this.viewRubric();
    this.addInitialForm();
    this.listRubric();
  }

  // get rubric id
  getRubricId(id) {
    this.rubricId = id
    if (id) {
      this.subCatSelected = false;
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

  // add rubric api
  addRubric() {
    for (let i = 0; i < this.listingData.length; i++) {
      var newData = this.listingData[i].value
      this.numberValues.push(newData)
    }
    const titleForm = this.employees().getRawValue();
    const data = {
      "type": "add",
      "critterion_input": titleForm,
      "number": this.numberValues,
      "rubric_title": this.empForm.value.rubric_title,
    }
    this.service.post('rubric-api', data, 1).subscribe(res => {
      if (res.status == 1) {
        this.util.showSuccessAlert('Rubric added successully')
        this.listRubric();
        setTimeout(() => {
          this.closeRubric.nativeElement.click();
        }, 1000);
      }
    })
  }

  // calculate the sun of rubric
  sumMethod(empIndex) {
    var arrayControl = this.employees()
      .at(empIndex)
      .get('scale') as FormArray;

    var marks = arrayControl.value
    var highestMarks = 0
    if (marks.length > 0) {
      marks.forEach(element => {
        var numberValue = Number(element.value);
        if (highestMarks < numberValue) {
          highestMarks = numberValue
        }
      });
    }
    var isAllreadyExist = false
    var index = -1
    for (let i = 0; i < this.listingData.length; i++) {
      var data = this.listingData[i]
      if (data.id == empIndex) {
        isAllreadyExist = true
        index = i
        break;
      }
    }
    if (isAllreadyExist) {
      this.listingData[index].value = highestMarks
      console.log('agd', this.listingData)
    } else {
      this.listingData.push({ id: empIndex, value: highestMarks })
    }
  }

  // method for allowng only number in rubric
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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
}
