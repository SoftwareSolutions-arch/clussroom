import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { UtilService } from '../../../providers/util.service';

@Component({
  selector: 'app-fill-in-the-blanks',
  templateUrl: './fill-in-the-blanks.component.html',
  styleUrls: ['./fill-in-the-blanks.component.css']
})
export class FillInTheBlanksComponent implements OnInit {

  isLoadingBool: boolean = false;
  totalWords: any;
  isCheckBoxChecked: any = '';
  fillData: any = {
    question: ''
  }
  usersForm: FormGroup;
  errorMessage: string;
  mainFormArray: Array<any> = [];

  imageSrc;

  ExteriorPicFile: any = [];

  ExteriorPicString: any = [];
  baseString: string = 'data:image/png;base64,';
  fileLists: any = [];

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];
  constructor(private formBuilder: FormBuilder, public util: UtilService) { }

  ngOnInit() {
    this.usersForm = this.formBuilder.group({
      users: this.formBuilder.array([
        this.formBuilder.group({
          address: '',
        })
      ])
    });
    console.log('mainFormArray',this.mainFormArray)
  }

  countWords(str) {
    var matches = str.match(/_+/gi);
    return matches ? matches.length : 0;
  }

  countTotalWords() {
    var data = this.fillData.question
    this.totalWords = this.countWords(data)
    this.counter(this.totalWords)
  }

  counters(i: number) {
    return new Array(i);
  }


  initUserRow(): FormGroup {
    return this.formBuilder.group({
      address: new FormControl(""),
    });
  }


  counter(i: number) {
    this.mainFormArray = []
    for (let j = 0; j < i; j++) {
      this.mainFormArray.push({ myFormsList: this.getNewUserFrom() });
    }
  }

  getNewUserFrom() {
    return this.formBuilder.group({
      users: this.formBuilder.array([
        this.formBuilder.group({
          address: new FormControl(""),
        })
      ])
    });
  }

  addUserRow(parent): void {
    const usersArray = this.mainFormArray[parent];
    let arrayTOPush = usersArray.myFormsList.controls['users'];
    var data = arrayTOPush.controls.length;
    console.log('data', this.mainFormArray);
    if (data < 3) {
      arrayTOPush.push(this.initUserRow());
    }
    else {
      this.util.errorAlertPopup("can't add more than three items");
    }

  }

  removeUserRow(parent: number, rowIndex: number): void {
    console.log(parent, rowIndex)
    let userForm = this.mainFormArray[parent].myFormsList;
    const usersArray = <FormArray>userForm.controls['users'];
    console.log(userForm, usersArray)
    console.log('usersArray.length', usersArray.length)
    if (usersArray.length > 1) {
      usersArray.removeAt(rowIndex);
    } else {
      this.errorMessage =
        'You cannot delete this row!  form should contain at least one row!';
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    }
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



  isClicked(event) {
    console.log('isClicked', event.target.checked);
    this.isCheckBoxChecked = event.target.checked
  }

  saveQuestion() {
    console.log('this.mainFormArray', this.mainFormArray);
    console.log('this.usersForm', this.usersForm.value);
  }
}
