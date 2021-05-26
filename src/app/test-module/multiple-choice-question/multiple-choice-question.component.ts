import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SharedServiceService } from '../../shared-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../providers/util.service';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css']
})
export class MultipleChoiceQuestionComponent implements OnInit {
  isLoadingBool: boolean = false;
  imageSrc;

  ExteriorPicFile: any = [];

  ExteriorPicString: any = [];
  baseString: string = 'data:image/png;base64,';
  fileLists: any = [];

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];
  fillData: any = {
    test_assignment_nid: "",
    test_assignment_question_type: "mcq",
    question: "",
    attachment: [],
    mcq_option_text: [],
    mcq_option_check: [],
    jumble_questions_placement: "",
    points: "",
    partial_points: ""
  }
  myForm: FormGroup;
  arr = new FormArray([])
  testId: any = '';
  getQuestionId: any = '';
  isEditQuestion: boolean;
  constructor(public util: UtilService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, public service: SharedServiceService) {
    this.testId = localStorage.getItem('test_id');
    this.getQuestionId = this.route.snapshot.paramMap.get('id');
    this.getQuestionDetais();
  }


  ngOnInit() {
    if (this.getQuestionId != null) {
      this.myForm = this.fb.group({
        arr: this.fb.array([])
      })
    }

    else {
      this.myForm = this.fb.group({
        arr: this.fb.array([this.createItem()])
      })
    }
  }

  getQuestionDetais() {

    if (this.getQuestionId != null) {
      this.isEditQuestion = false;
      let params = {
        'question_id': this.getQuestionId
      }
      this.isLoadingBool = true;
      this.service.post('questions-listing', params, 1).subscribe(result => {
        this.isLoadingBool = false;
        console.log('result', result.question_data[0].multiple_choices);

        result.question_data[0].multiple_choices;
        result.question_data[0].multiple_choices.forEach((element, index) => {
          this.arr = this.myForm.get('arr') as FormArray;
          this.arr.push(this.createItem());
          console.log('data', this.myForm.controls.arr.controls)
          this.myForm.controls.arr.controls[index].controls.question.patchValue(element.option_text)
          this.myForm.controls.arr.controls[index].controls.question_checkbox.patchValue(element.anser_check)
        });


        var data = result.question_data[0];
        this.fillData = {
          test_assignment_nid: data.id,
          test_assignment_question_type: "mcq",
          question: data.paper_summary,
          attachment: data.paper_attachemet_data,
          jumble_questions_placement: data.jumble,
          points: data.points,
          partial_points: data.partial_points
        }
      })
    }

    else {
      this.isEditQuestion = true;
      return
    }
  }


  createItem() {
    return this.fb.group({
      question: '',
      question_checkbox: ['']
    })
  }

  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  deleteUser(skillIndex) {
    if (skillIndex > 0) {
      this.arr.removeAt(skillIndex);
    }
  }

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

  saveQuestion() {
    this.fillData.mcq_option_text = [];
    this.fillData.mcq_option_check = [];

    this.myForm.value.arr.forEach(element => {
      this.fillData.mcq_option_text.push(element.question);
      this.fillData.mcq_option_check.push((element.question_checkbox == true) ? "1" : "0");
    });
    this.fillData.attachment = this.ExteriorPicString;
    this.fillData.partial_points = ((this.fillData.partial_points == true) ? "1" : "0")
    this.fillData.jumble_questions_placement = ((this.fillData.jumble_questions_placement == true) ? "1" : "0")
    this.fillData.test_assignment_nid = this.testId

    this.isLoadingBool = true;
    this.service.post('add-question-api', this.fillData, 1).subscribe(result => {

      this.util.showSuccessAlert(result.message);
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
    })
  }


  saveEditQuestion() {
    this.fillData.mcq_option_text = [];
    this.fillData.mcq_option_check = [];

    this.myForm.value.arr.forEach(element => {
      this.fillData.mcq_option_text.push(element.question);
      this.fillData.mcq_option_check.push((element.question_checkbox == true) ? "1" : "0");
    });
    this.fillData.attachment = this.ExteriorPicString;
    this.fillData.partial_points = ((this.fillData.partial_points == true) ? "1" : "0")
    this.fillData.jumble_questions_placement = ((this.fillData.jumble_questions_placement == true) ? "1" : "0")
    this.fillData.test_assignment_nid = this.testId

    let params = {
      'question_pragraph_id': this.getQuestionId,
      'test_assignment_question_type': 'mcq',
      'question': this.fillData.question,
      'edit_match_question_text': this.fillData.mcq_option_text,
      'edit_match_answer_text': this.fillData.mcq_option_check,
      'jumble_questions_placement': this.fillData.jumble_questions_placement,
      'partial_points': this.fillData.partial_points,
      'points': this.fillData.points,
      'attachment': this.fillData.attachment
    }
    console.log('params', params);

    this.isLoadingBool = true;
    this.service.post('edit-question-api', params, 1).subscribe(result => {
      this.util.showSuccessAlert(result.message);
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
    })
  }
}