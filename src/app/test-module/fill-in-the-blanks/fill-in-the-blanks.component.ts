import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { UtilService } from 'src/providers/util.service';

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

  imageSrc;

  ExteriorPicFile: any = [];

  ExteriorPicString: any = [];
  baseString: string = 'data:image/png;base64,';
  fileLists: any = [];

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];


  constructor(private router: Router, private fb: FormBuilder, public util: UtilService) {
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

  picked(event: any) {
    this.fileLists = FileList = event.target.files;
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      const file: File = this.fileLists[i];
      this.ExteriorPicFile = file;
      this.handleInputChange(file); //turn into base64
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name)
    }

    this.attachment.nativeElement.value = '';
  }

  removeImage(index) {
    console.log('fileList', this.fileList, this.listOfFiles)
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
    console.log('fileList2', this.fileList, this.listOfFiles)
    this.ExteriorPicString.splice(index, 1);

  }

  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.ExteriorPicString.push(base64result);
    console.log('this.ExteriorPicString', this.ExteriorPicString);
  }

  saveQuestion() {
    this.fillData.attachment = this.fileList
    console.log('afterfillData', this.fillData);
  }

}
