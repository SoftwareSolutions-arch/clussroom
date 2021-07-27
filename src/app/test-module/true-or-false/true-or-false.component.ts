import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../providers/util.service';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-true-or-false',
  templateUrl: './true-or-false.component.html',
  styleUrls: ['./true-or-false.component.css']
})
export class TrueOrFalseComponent implements OnInit {
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
    test_assignment_question_type: "true_false",
    question: "",
    attachment: "",
    points: "",
    checkstatus: "1",
    true_false_answers: [],
    correct_answer: ""
  }
  testId: any = '';
  getQuestionId: any;
  isEditQuestion: boolean;
  isImageShow: boolean = true;
  classId: any = '';
  constructor(public util: UtilService, private route: ActivatedRoute, public service: SharedServiceService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    this.getQuestionId = this.route.snapshot.paramMap.get('id');
    this.getQuestionDetais();
    this.classId = localStorage.getItem('classListId');

  }


  ngOnInit(): void {
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
  removeImages(index) {
    this.fillData.attachment.splice(index, 1);
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

  // save question
  saveQuestion() {
    this.fillData.attachment = this.ExteriorPicString

    let params = {
      "test_assignment_nid": this.testId,
      "test_assignment_question_type": "true_false",
      "question": this.fillData.question,
      "attachment": this.fillData.attachment,
      "points": this.fillData.points,
      "checkstatus": "1",
      "correct_answer": this.fillData.correct_answer
    }

    this.isLoadingBool = true;
    this.service.post('add-question-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      this.util.showSuccessAlert('Answer Saved Successfully');
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
        this.isLoadingBool = false;
        
        var data = result.question_data[0]
        this.fillData = {
          question: data.paper_summary,
          points: data.points,
          attachment: data.attachment,
          correct_answer: data.correct_answer
        }
      })
    }
  }

  // save question
  editQuestion() {
    this.fillData.attachment = this.ExteriorPicString
    let params = {
      'question_pragraph_id': this.getQuestionId,
      "class_id": this.classId,
      "test_assignment_question_type": "true_false",
      "question": this.fillData.question,
      "attachment": this.fillData.attachment,
      "points": this.fillData.points,
      "checkstatus": "1",
      "correct_answer": this.fillData.correct_answer
    }

    this.isLoadingBool = true;
    this.service.post('edit-question-api', params, 1).subscribe(result => {
      
      this.isLoadingBool = false;
      this.util.showSuccessAlert('Updated Successfully');
      this.router.navigate(['/test/question-screen']);
    })
  }

  cancel(){
    this.router.navigate(['/test/question-screen']);
  }
}
