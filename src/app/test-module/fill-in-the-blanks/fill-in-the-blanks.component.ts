import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { UtilService } from '../../../providers/util.service';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-fill-in-the-blanks',
  templateUrl: './fill-in-the-blanks.component.html',
  styleUrls: ['./fill-in-the-blanks.component.css']
})
export class FillInTheBlanksComponent implements OnInit {
  @ViewChild('attachments') attachment: any;

  leagueForm: FormGroup;
  isLoadingBool: boolean = false;
  totalWords: any;
  isCheckBoxChecked: any = '';
  errorMessage: string;
  ExteriorPicFile: any = [];
  ExteriorPicString: any = [];
  fileLists: any = [];
  fileList: File[] = [];
  listOfFiles: any[] = [];
  baseString: string = 'data:image/png;base64,';
  registerForm: FormGroup
  fillData: any = {
    test_assignment_nid: "",
    test_assignment_question_type: "fill_in_the_blanks",
    attachment: "",
    question: "",
    words_hint: "",
    points: "",
    words_hint_text: [],
    partial_points: "",
    fill_inthe_blanks_options: "",
  }
  testId: any = '';
  constructor(private router: Router, private fb: FormBuilder, public service: SharedServiceService, public util: UtilService) {
    this.testId = localStorage.getItem('test_id');
    console.log('****', this.testId);
  }

  ngOnInit() {
    this.leagueForm = this.fb.group({
      answerList: this.fb.array([this.answerList])
    });
  }

  get answerList(): FormGroup {
    return this.fb.group({
      question: this.fb.array([this.question])
    });
  }

  get question(): FormGroup {
    return this.fb.group({
      answer: "",
    });
  }

  addTeams(i: number) {
    for (let j = 0; j < i; j++) {
      (this.leagueForm.get("answerList") as FormArray).push(this.answerList);
    }
  }

  deleteTeam(index) {
    (this.leagueForm.get("answerList") as FormArray).removeAt(index);
  }

  addPlayer(team) {
    var data = team.controls.question.controls;
    if (data.length < 3) {
      team.get("question").push(this.question);
    }

    else {
      this.util.errorAlertPopup("can't add more than three items");
    }

  }

  deletePlayer(team, index) {

    if (index < 1) {
      this.util.errorAlertPopup("can't delete last item");
      return
    }

    else {
      team.get("question").removeAt(index);
    }
  }

  countWords(str) {
    var matches = str.match(/_+/gi);
    return matches ? matches.length : 0;
  }

  countTotalWords() {
    this.leagueForm = this.fb.group({
      answerList: this.fb.array([])
    });
    var data = this.fillData.question
    this.totalWords = this.countWords(data)
    this.addTeams(this.totalWords)
  }

  counter(i: number) {
    return new Array(i);
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

    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);

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

  }

  isClicked(event) {

    this.isCheckBoxChecked = event.target.checked
  }

  saveQuestion() {
    // this.fillData.attachment = this.ExteriorPicString;
    this.fillData.fill_inthe_blanks_options = this.leagueForm.value.answerList;
    var data = [];

    this.fillData.fill_inthe_blanks_options.forEach(element => {
      data.push(element.question);
    });
    console.log('data', JSON.stringify(data));
   

    // this.fillData.test_assignment_nid = this.testId
    // this.isLoadingBool = true;
    // console.log('this.fillData', this.testId, this.fillData)
    // this.service.post('add-question-api', this.fillData, 1).subscribe(result => {
    //   console.log('result from fill blanks', result);
    //   this.util.showSuccessAlert('Answer saved successfully');
    //   this.isLoadingBool = false;
    //   this.router.navigate(['/test/question-screen']);
    // })
  }
}
