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
  question_id: any
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
    question_id: ""
  }
  testId: any = '';
  getQuestionId: any;
  isEditQuestion: boolean;
  isImageShow: boolean = true;
  classId: any = '';
  arrayList = [];

  new_image_Description = [];

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, public service: SharedServiceService, public util: UtilService) {
    this.testId = localStorage.getItem('test_id');
    this.getQuestionId = this.route.snapshot.paramMap.get('id');
    this.getQuestionDetais();
  }

  ngOnInit() {
    this.leagueForm = this.fb.group({
      answerList: this.fb.array([])
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
      id: ''
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


  cancel() {
    this.router.navigate(['/test/question-screen']);
  }

  picked(event: any) {
    if(this.fillData.attachment==null){
      this.fillData.attachment=[];
    }
    if(this.ExteriorPicString.length + this.fillData.attachment.length < 4){
      if(event.target.files.length>4){
        this.util.errorAlertPopup('Can not select more than 4 images');
      }

      else{
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
    }

    else{
      this.util.errorAlertPopup('Can not select more than 4 images');
    }
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

    this.fillData.attachment = this.ExteriorPicString;
    this.fillData.fill_inthe_blanks_options = this.leagueForm.value.answerList;
    var data = [];

    this.fillData.fill_inthe_blanks_options.forEach(element => {
      data.push(element.question);
    });

    let params = {
      test_assignment_nid: this.testId,
      test_assignment_question_type: "fill_in_the_blanks",
      question: this.fillData.question,
      attachment: this.ExteriorPicString,
      fill_inthe_blanks_options: data,
      words_hint: (this.fillData.words_hint == true) ? "1" : "0",
      words_hint_text: this.words_hint_text,
      partial_points: (this.fillData.partial_points == true) ? "1" : "0",
      points: this.fillData.points,
      image_description: this.new_image_Description
    }


    this.isLoadingBool = true;
    this.service.post('add-question-api', params, 1).subscribe(result => {

      this.util.showSuccessAlert('Question added successfully');
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
    })
  }

  getQuestionDetais() {
    if (this.getQuestionId == null) {
      this.isEditQuestion = true;
      return
    }

    else {
      this.leagueForm = this.fb.group({
        answerList: this.fb.array([])
      });
      this.isEditQuestion = false;
      let params = {
        'question_id': this.getQuestionId
      }
      this.isLoadingBool = true;
      this.service.post('questions-listing', params, 1).subscribe(result => {

        this.isLoadingBool = false;
        var data = result.question_data[0]
        this.fillData = {
          question: data.paper_summary,
          points: data.points,
          attachment: data.attachment,
          correct_answer: data.correct_answer,
          partial_points: data.partial_points,
          old_image_Description: data.old_image_Description
        }
        result.question_data[0].blanks_options.forEach((element, index) => {
          (this.leagueForm.get("answerList") as FormArray).push(this.answerList)
          // this.leagueForm.get('answerList')['controls'][index].controls.question.controls[0].controls.id.patchValue(element.id)
          // this.leagueForm.get('answerList')['controls'][index].controls.question.controls[0].controls.answer.patchValue(element.field_answers[0])
          element.field_answers.forEach((elements, j) => {
            this.addPlayer(this.leagueForm.get('answerList')['controls'][index]);
            this.leagueForm.get('answerList')['controls'][index].controls.question.controls[j].controls.id.patchValue(element.id)
            this.leagueForm.get('answerList')['controls'][index].controls.question.controls[j].controls.answer.patchValue(elements)
          })
        });
        result.question_data[0].word_hint_text.forEach((element, i) => {
          this.words_hint_text[i] = element
        });
        // result.question_data[0].blanks_options.forEach((element, i) => {
        //   this.question_id[i] = element.id
        // });

      })
    }
  }

  editQuestion() {
    var datas = [];

    if (this.fillData.attachment != null) {
      this.fillData.attachment.forEach(element => {
        datas.push(element.id)
      });
    }

    this.fillData.fill_inthe_blanks_options = this.leagueForm.value.answerList;

    this.fillData.fill_inthe_blanks_options.forEach(element => {
      let arrayList = [];
      element.question.forEach(element => {
        if (element.answer != '') {
          arrayList.push(element.answer)
        }
      });

      this.arrayList.push({
        id: element.question[0].id,
        answer: arrayList
      })
    });
    this.fillData.partial_points = (this.fillData.partial_points == true) ? "1" : "0";
    this.fillData.words_hint = (this.fillData.words_hint == true) ? "1" : "0"

    if(this.fillData.attachment!=null){
      var old_attchment = [];
      this.fillData.attachment.forEach(element => {
        old_attchment.push({
          'id': element.id,
          'image_description': element.image_description
        })
      });
    }

    let params = {
      question_pragraph_id: this.getQuestionId,
      test_assignment_question_type: "edit_fill_in_the_blanks",
      question: this.fillData.question,
      attachment: this.ExteriorPicString,
      fill_inthe_blanks_options: this.arrayList,
      words_hint: (this.fillData.words_hint == true) ? "1" : "0",
      words_hint_text: this.words_hint_text,
      partial_points: (this.fillData.partial_points == true) ? "1" : "0",
      points: this.fillData.points,
      previous_attachment_f_ids: old_attchment,
      image_description: this.new_image_Description,
    }

    console.log('params', params);

    this.isLoadingBool = true;
    this.service.post('edit-question-api', params, 1).subscribe(result => {
      this.util.showSuccessAlert('Updated successfully');
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
    })
  }

  removeImages(index) {
    this.fillData.attachment.splice(index, 1);
  }
}
