import { UtilService } from '../../../providers/util.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SharedServiceService } from '../../shared-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {
  isLoadingBool: boolean = false;
  fillData: any = {
    test_assignment_nid: "",
    test_assignment_question_type: "matching",
    question: "",
    attachment: [],
    jumble_questions_placement: "",
    points: "",
    checkstatus: "",
    match_answer_text: [],
    match_question_text: [],
    jumble_points: '',
    partial_points: '',
  }

  imageSrc;
  ExteriorPicFile: any = [];
  ExteriorPicString: any = [];
  baseString: string = 'data:image/png;base64,';
  fileLists: any = [];
  @ViewChild('attachments') attachment: any;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  myForm: FormGroup;
  arr: FormArray;
  testId: any = '';
  getQuestionId: any;
  isEditQuestion: boolean;
  isImageShow: boolean = true;
  classId: any = '';
  constructor(public util: UtilService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, public service: SharedServiceService) {
    this.testId = localStorage.getItem('test_id');
    this.getQuestionId = this.route.snapshot.paramMap.get('id');
    this.getQuestionDetais();
    this.classId = localStorage.getItem('classListId');
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

  createItem() {
    return this.fb.group({
      question: [''],
      answer: ['']
    })
  }

  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
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
    this.isLoadingBool = true;

    var userA = [];
    var userB = [];
    this.myForm.value.arr.forEach(element => {
      userA.push(element.question);
      userB.push(element.answer);
    });
    this.fillData.attachment = this.ExteriorPicString
    this.fillData.match_question_text = userA
    this.fillData.match_answer_text = userB
    this.fillData.test_assignment_nid = this.testId
    console.log('this.fillData', this.fillData);
    this.service.post('add-question-api', this.fillData, 1).subscribe(result => {
      console.log('result', result)
      this.util.showSuccessAlert('Answer Saved Successfully');
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
    })
  }

  deleteUser(skillIndex) {
    if (skillIndex > 0) {
      this.arr.removeAt(skillIndex);
    }
  }

  removeImages(index) {
    this.fillData.attachment.splice(index, 1);
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
        this.isLoadingBool = false;

        console.log('result',result);
        result.question_data[0].matching_question_answers.forEach((element, index) => {
          this.arr = this.myForm.get('arr') as FormArray;
          this.arr.push(this.createItem());
          this.myForm.get('arr')['controls'][index].controls.question.patchValue(element.question)
          this.myForm.get('arr')['controls'][index].controls.answer.patchValue(element.answer)
        });
        
        console.log('result', result);
        var data = result.question_data[0]
        this.fillData = {
          question: data.paper_summary,
          points: data.points,
          attachment: data.attachment,
          correct_answer: data.correct_answer,
          minimum_sequence: data.minimum_sequence,
          partial_points: data.partial_points,
          jumble_questions_placement: data.jumble,
          jumble_points: data.jumble_points
        }
      })
    }
  }
}
