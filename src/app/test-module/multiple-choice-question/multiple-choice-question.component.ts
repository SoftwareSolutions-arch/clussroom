import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
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
  index = [];
  old_image_Description = []
  new_image_Description = []
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
        console.log('resuult', result);
        this.isLoadingBool = false;
        result.question_data[0].multiple_choices.forEach((element, index) => {
          this.arr = this.myForm.get('arr') as FormArray;
          this.arr.push(this.createItem());
          this.myForm.get('arr')['controls'][index].controls.question.patchValue(element.option_text)
          this.myForm.get('arr')['controls'][index].controls.question_checkbox.patchValue((element.anser_check == 1) ? true : false)
          this.myForm.get('arr')['controls'][index].controls.id.patchValue(element.id)
        });

        var data = result.question_data[0];
        this.fillData = {
          test_assignment_nid: data.id,
          test_assignment_question_type: "mcq",
          question: data.paper_summary,
          attachment: data.attachment,
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

  removeImages(index) {
    this.fillData.attachment.splice(index, 1);
  }


  createItem() {
    return this.fb.group({
      question: '',
      question_checkbox: [{ value: false, disabled: true }, ''],
      id: ''
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

    this.myForm.value.arr.forEach(element => {
      this.fillData.mcq_option_text.push(element.question);
    });
    this.fillData.mcq_option_check = this.index
    this.fillData.attachment = this.ExteriorPicString;
    this.fillData.partial_points = ((this.fillData.partial_points == true) ? "1" : "0")
    this.fillData.jumble_questions_placement = ((this.fillData.jumble_questions_placement == true) ? "1" : "0")
    this.fillData.test_assignment_nid = this.testId;

    let params = {
      "test_assignment_nid": this.testId,
      "test_assignment_question_type": "mcq",
      "question": this.fillData.question,
      "attachment": this.ExteriorPicString,
      "mcq_option_text": this.fillData.mcq_option_text,
      "jumble_questions_placement": this.fillData.jumble_questions_placement,
      "points": this.fillData.points,
      "mcq_option_check": this.index,
      "partial_points": this.fillData.partial_points,
      "image_description": this.new_image_Description
    }

    console.log('parmas', params);

    this.isLoadingBool = true;
    this.service.post('add-question-api', this.fillData, 1).subscribe(result => {
      console.log('result', result);
      this.util.showSuccessAlert(result.message);
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
    })
  }

  isClicked(event, i) {
    if (event.target.checked) {
      this.index.push(i);
    }
    else {
      this.index = this.index.filter(
        index => index != i);
    }
  }

  saveEditQuestion() {
    console.log('new_image_Description', this.new_image_Description);
    console.log('old_image_Description', this.old_image_Description);
    var image_description = this.old_image_Description.concat(this.new_image_Description)
    this.fillData.mcq_option_text = [];
    this.fillData.mcq_option_check = [];

    this.myForm.value.arr.forEach(element => {
      if (element.id != '') {
        this.fillData.mcq_option_text.push({
          pid: element.id,
          option: element.question,
        });
      }
      if (element.id == '') {
        this.fillData.mcq_option_text.push({
          option: element.question,
        });
      }
    });

    var data = [];
    this.fillData.attachment.forEach(element => {
      data.push(element.id)
    });

    this.fillData.attachment = this.ExteriorPicString;
    this.fillData.partial_points = ((this.fillData.partial_points == true) ? "1" : "0")
    this.fillData.jumble_questions_placement = ((this.fillData.jumble_questions_placement == true) ? "1" : "0")
    this.fillData.test_assignment_nid = this.testId;

    let params = {
      'question_pragraph_id': this.getQuestionId,
      'test_assignment_question_type': 'mcq',
      'question': this.fillData.question,
      'previous_attachment_f_ids': data,
      "mcq_option_array": this.fillData.mcq_option_text,
      "mcq_option_check": this.index,
      'jumble_questions_placement': this.fillData.jumble_questions_placement,
      'partial_points': this.fillData.partial_points,
      'points': this.fillData.points,
      'attachment': this.fillData.attachment,
      "image_description": image_description
    }
    console.log('params', params);

    // this.isLoadingBool = true;
    // this.service.post('edit-question-api', params, 1).subscribe(result => {
    //   this.util.showSuccessAlert(result.message);
    //   this.isLoadingBool = false;
    //   this.router.navigate(['/test/question-screen']);
    // })
  }
}