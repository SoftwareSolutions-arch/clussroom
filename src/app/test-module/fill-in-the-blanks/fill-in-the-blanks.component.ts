import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-fill-in-the-blanks',
  templateUrl: './fill-in-the-blanks.component.html',
  styleUrls: ['./fill-in-the-blanks.component.css']
})
export class FillInTheBlanksComponent implements OnInit {
  isLoadingBool: boolean = false;
  fillData: any = {
    question: ''
  }
  addCourseForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.addCourseForm = this.fb.group({
      employees: this.fb.array([]),
    })
    this.addInitialForms();
  }

  ngOnInit(): void {
  }

  employees(): FormArray {
    return this.addCourseForm.get("employees") as FormArray
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      answer1: '',
      skills: this.fb.array([])
    })
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  addInitialForms() {
    this.addEmployee();
    this.addEmployeeSkill(this.employees().controls.length - 1);
  }


  employeeSkills(empIndex: number): FormArray {
    return this.employees().at(empIndex).get("skills") as FormArray
  }

  newSkill(): FormGroup {
    return this.fb.group({
      answer2: ['', [Validators.required]]
    })
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  deleteUser(empIndex, skillIndex) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  cancel() { }

  saveQuestion() {
    // this.router.navigate(['/'])
    console.log('fillData', this.fillData);
  }

}
