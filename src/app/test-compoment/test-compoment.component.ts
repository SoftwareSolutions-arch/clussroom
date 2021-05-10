import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-test-compoment',
  templateUrl: './test-compoment.component.html',
  styleUrls: ['./test-compoment.component.css']
})
export class TestCompomentComponent implements OnInit {
  usersForm: FormGroup;
  errorMessage: string;
  mainFormArray: Array<any> = [];
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.usersForm = this.formBuilder.group({
      name: '',
      users: this.formBuilder.array([
        this.formBuilder.group({
          address: [null, [Validators.required]],
          phone: [null, [Validators.required]]
        })
      ])
    });
    // Get total words and generate forms array list\
    this.counter(5);
  }

  initUserRow(): FormGroup {
    return this.formBuilder.group({
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    });
  }

  addUserRow(parent): void {
    const usersArray = this.mainFormArray[parent];
    let arrayTOPush = usersArray.myFormsList.controls['users'];
    arrayTOPush.push(this.initUserRow());
  }

  removeUserRow(parent: number, rowIndex: number): void {
    let userForm = this.mainFormArray[parent].myFormsList;
    const usersArray = <FormArray>userForm.controls['users'];
    if (usersArray.length > 1) {
      usersArray.removeAt(rowIndex);
    } else {
      this.errorMessage =
        'You cannot delete this row! form should contain at least one row!';
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    }
  }

  submit() {
    console.log(this.usersForm.value);
  }

  counter(i: number) {
    // return new Array(2);
    // gegerate no of forms array based on 'i'
    for (let j = 0; j < 5; j++) {
      this.mainFormArray.push({ myFormsList: this.getNewUserFrom() });
    }
  }
  getNewUserFrom() {
    return this.formBuilder.group({
      name: '',
      users: this.formBuilder.array([
        this.formBuilder.group({
          address: [null, [Validators.required]],
          phone: [null, [Validators.required]]
        })
      ])
    });
  }
}