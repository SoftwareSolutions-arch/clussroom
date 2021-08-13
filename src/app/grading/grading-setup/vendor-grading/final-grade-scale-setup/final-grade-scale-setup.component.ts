import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

@Component({
  selector: 'app-final-grade-scale-setup',
  templateUrl: './final-grade-scale-setup.component.html',
  styleUrls: ['./final-grade-scale-setup.component.css']
})
export class FinalGradeScaleSetupComponent implements OnInit {
  empForm: FormGroup;
  buttonShow: boolean = false
  editShow: boolean = false;
  showValue: boolean = true;
  showNewValue: boolean = true;
  finalButtonShow: boolean = false;
  gradingShow: boolean = false;
  first: boolean = true;
  second: boolean = false;
  scales: boolean = false;
  scalesd = false
  editButton: boolean = false;
  formDisable: boolean = true;
  eventData: any;
  isLoadingBool: boolean = false;
  constructor(private fb: FormBuilder, private service: SharedServiceService, private util: UtilService) {
    this.empForm = this.fb.group({
      employees: this.fb.array([])
    });
  }

  ngOnInit() {
    this.InitialForms();
  }
  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }
  newEmployee(): FormGroup {
    return this.fb.group({
      grade: '',
      point: '',
    });
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }
  InitialForms() {
    this.addEmployee()
    this.employees().controls.length - 1;
  }
  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  // grading value data
  gradingValue(evt) {
    this.eventData = evt;
    this.buttonShow = true
    this.editShow = false
  }

  // grading scale confirm button
  confirmButton() {
    if (this.eventData == 'percentage') {
      this.showValue = true
      this.showNewValue = false
    } if (this.eventData == 'A/B/C/D') {
      this.showValue = false
      this.showNewValue = true
    }
    this.editShow = true
    this.buttonShow = false
  }
  // update grading value
  // editGradingValue() {
  //   this.first = false;
  //   this.second = true;
  //   this.showNewValue = true;
  //   this.showValue = true
  //   this.editShow = false
  //   this.finalButtonShow = true
  // }

  // // final confirmation
  // confirmedButton() {
  //   this.gradingShow = true
  //   this.showNewValue = true;
  //   this.showValue = true
  //   this.second = true;
  //   this.editShow = false
  //   this.finalButtonShow = false
  // }
  // scaleConfirm() {
  //   this.editButton = true;
  //   this.scalesd = true;
  //   this.scales = false;
  //   this.empForm.disable()
  // }
  gradingValues(evt) {
  if(evt == 'percentage'){
    this.gradingShow = false
     this.scalesd = true;
     this.scales = false;
     this.finalButtonShow = false;
  } if(evt == 'A/B/C/D'){
    this.gradingShow = true
    this.scales = true;
    this.scalesd = false;
    this.finalButtonShow = false

  }
  }
  editGradingValue(){
    this.first = false;
    this.second = true;
    this.showNewValue = true;
    this.showValue = true
    this.editShow = false
    this.finalButtonShow = true
  }
  scaleConfirm() {
    this.editButton = true;
    this.scalesd = true;
    this.scales = false;
    this.empForm.disable()
  }
  editForm() {
    this.empForm.enable()
  }

  // submit api
  submit() {
    this.isLoadingBool = true
    const scaleData = this.employees().getRawValue()
    const data = {
      course_nid: localStorage.getItem('course-id'),
      grading_scale: this.eventData,
      grading_scale_for_a: scaleData
    }
    this.service.post('course-grades-setup', data, 1).subscribe(res => {
      this.isLoadingBool = false
      if (status == '1') {
        this.util.showSuccessAlert('Grading Scale Added Successfully')
      }
    })
  }
}
