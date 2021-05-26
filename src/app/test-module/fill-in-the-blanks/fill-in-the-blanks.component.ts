import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  registerForm: FormGroup;
  words_hint_text: any = []
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
  getQuestionId: any;
  isEditQuestion: boolean;
  isImageShow: boolean = true;
  classId: any = '';
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, public service: SharedServiceService, public util: UtilService) {
    this.testId = localStorage.getItem('test_id');
    this.getQuestionId = this.route.snapshot.paramMap.get('id');
    this.getQuestionDetais();
    this.classId = localStorage.getItem('classListId');
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

  setValue(){
   

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
    console.log('words_hint_text', this.words_hint_text)

    this.fillData.attachment = this.ExteriorPicString;
    this.fillData.fill_inthe_blanks_options = this.leagueForm.value.answerList;
    var data = [];

    this.fillData.fill_inthe_blanks_options.forEach(element => {
      data.push(element.question);
    });


    this.fillData.fill_inthe_blanks_options = data;
    this.fillData.partial_points = (this.fillData.partial_points == true) ? "1" : "0";
    this.fillData.words_hint = (this.fillData.words_hint == true) ? "1" : "0"
    this.fillData.test_assignment_nid = this.testId
    this.isLoadingBool = true;
    console.log('this.fillData', JSON.stringify(this.fillData));
    this.service.post('add-question-api', this.fillData, 1).subscribe(result => {
      console.log('result from fill blanks', result);
      this.util.showSuccessAlert('Answer saved successfully');
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
    })
  }

  getQuestionDetais() {
    console.log('this.getQuestionId', this.getQuestionId);
    if (this.getQuestionId == null) {
      this.isEditQuestion = true;
      return
    }

    else {
      this.isEditQuestion = false;
      let params = {
        'question_id': this.getQuestionId
      }
      this.isLoadingBool = true;
      this.service.post('questions-listing', params, 1).subscribe(result => {
        let users:any = this.leagueForm.get("answerList").value[0].question[0].answer as FormArray;
        var datas =[]
        datas.push(users)
        users.patchValue('1232')
        

        this.isLoadingBool = false;
        console.log('result', result);
        var data = result.question_data[0]
        this.fillData = {
          question: data.paper_summary,
          points: data.points,
          attachment: data.attachment,
          correct_answer: data.correct_answer,
          partial_points: data.partial_points,
          word_hints: data.word_hints,
        }

        
      })
    }
  }

  editQuestion() {
    this.fillData.attachment = this.ExteriorPicString;
    this.fillData.fill_inthe_blanks_options = this.leagueForm.value.answerList;
    var data = [];

    this.fillData.fill_inthe_blanks_options.forEach(element => {
      data.push(element.question);
    });


    this.fillData.fill_inthe_blanks_options = data;
    this.fillData.partial_points = (this.fillData.partial_points == true) ? "1" : "0";
    this.fillData.words_hint = (this.fillData.words_hint == true) ? "1" : "0"
    this.fillData.test_assignment_nid = this.testId;

    let params = {
      question_pragraph_id: this.getQuestionId,
      class_id: this.classId,
      test_assignment_question_type: "edit_fill_in_the_blanks",
      question: this.fillData.question,
      previous_attachment_f_ids: "",
      all_previous_pids: "",
      fill_inthe_blanks_options: this.fillData.fill_inthe_blanks_options,
      words_hint: this.fillData.words_hint,
      words_hint_text: this.words_hint_text,
      partial_points: this.fillData.partial_points,
      points: this.fillData.points

    }

    console.log('parmas', params);

    this.isLoadingBool = true;
    this.service.post('edit-question-api', params, 1).subscribe(result => {
      console.log('result from fill blanks', result);
      this.util.showSuccessAlert('Answer Updated successfully');
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
      
    })
  }
}
