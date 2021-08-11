import { UtilService } from '../../../providers/util.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SharedServiceService } from '../../shared-service.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css']
})
export class OrderingComponent implements OnInit {
  isLoadingBool: boolean = false;
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
  itemListArray = []
  fillData: any = {
    test_assignment_nid: '184',
    test_assignment_question_type: "ordering",
    question: '',
    attachment: '',
    jumble_questions_placement: '',
    points: '',
    checkstatus: "1",
    partial_points: '',
    drag_drop_sequenece_answers: [],
    minimum_sequence: ''
  }
  testId: any = '';
  getQuestionId: any;
  isEditQuestion: boolean;
  isImageShow: boolean = true;
  classId: any = '';

  constructor(public util: UtilService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, public service: SharedServiceService) {
    this.testId = localStorage.getItem('test_id');
    this.getQuestionId = this.route.snapshot.paramMap.get('id');
    this.getQuestionDetais();
  }


  drop(event: CdkDragDrop<string[]>) {
    this.itemListArray = []
    moveItemInArray(this.myForm.get('arr')['controls'], event.previousIndex, event.currentIndex);
    this.myForm.get('arr')['controls'].forEach(element => {
      this.itemListArray.push(element.value.question)
    });


  }

  picked(event: any) {
    if (this.ExteriorPicString.length + this.fillData.attachment.length < 4) {
      if (event.target.files.length > 4) {
        this.util.errorAlertPopup('Can not select more than 4 images')
      }

      else {
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

    else {
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
      question: ['']
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

  saveQuestion() {
    var userA = [];
    this.myForm.value.arr.forEach(element => {
      userA.push(element.question);
    });

    let params = {
      test_assignment_nid: this.testId,
      test_assignment_question_type: "ordering",
      question: this.fillData.question,
      attachment: this.ExteriorPicString,
      jumble_questions_placement: (this.fillData.jumble_questions_placement == true) ? "1" : "0",
      points: this.fillData.points,
      partial_points: (this.fillData.partial_points == true) ? "1" : "0",
      checkstatus: 1,
      drag_drop_sequenece_answers: (this.itemListArray.length > 0) ? this.itemListArray : userA,
      minimum_sequence: "1",
    }

    console.log('params',params);

    this.isLoadingBool = true;
    this.service.post('add-question-api', params, 1).subscribe(result => {
      console.log('result',result);
      this.util.showSuccessAlert(result.message);
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
    })
  }

  editQuestion() {
    var userA = [];
    this.myForm.value.arr.forEach(element => {
      userA.push(element.question);
    });

    var datas = [];

    if (this.fillData.attachment != null) {
      this.fillData.attachment.forEach(element => {
        datas.push(element.id)
      });
    }


    let params = {
      question_pragraph_id: this.getQuestionId,
      class_id: this.classId,
      test_assignment_question_type: "edit_ordering",
      question: this.fillData.question,
      attachment: this.ExteriorPicString,
      jumble_questions_placement: (this.fillData.jumble_questions_placement == true) ? "1" : "0",
      points: this.fillData.points,
      partial_points: (this.fillData.partial_points == true) ? "1" : "0",
      checkstatus: 1,
      drag_drop_sequenece_answers: (this.itemListArray.length > 0) ? this.itemListArray : userA,
      minimum_sequence: this.fillData.minimum_sequence,
      previous_attachment_f_ids: datas,
    }
    console.log('params',params)
    this.isLoadingBool = true;
    this.service.post('edit-question-api', params, 1).subscribe(result => {

      this.util.showSuccessAlert(result.message);
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
      this.isEditQuestion = false;
      let params = {
        'question_id': this.getQuestionId
      }
      this.isLoadingBool = true;
      this.service.post('questions-listing', params, 1).subscribe(result => {
        console.log('result',result);
        this.isLoadingBool = false;

        result.question_data[0].ordering_sequence.forEach((element, index) => {
          this.arr = this.myForm.get('arr') as FormArray;
          this.arr.push(this.createItem());
          this.myForm.get('arr')['controls'][index].controls.question.patchValue(element.odering_option_text)
        });
        var data = result.question_data[0];
        this.fillData = {
          question: data.paper_summary,
          points: data.points,
          attachment: data.attachment,
          correct_answer: data.correct_answer,
          minimum_sequence: data.minimum_sequence,
          partial_points: data.partial_points,
          jumble_questions_placement: data.jumble,

        }
      })
    }
  }

  removeImages(index) {
    this.fillData.attachment.splice(index, 1);
  }


  cancel() {
    this.router.navigate(['/test/question-screen']);
  }
}
