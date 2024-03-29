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
  new_image_Description = [];
  constructor(public util: UtilService, private route: ActivatedRoute, public service: SharedServiceService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    this.getQuestionId = this.route.snapshot.paramMap.get('id');
    this.getQuestionDetais();
    this.classId = localStorage.getItem('classListId');

  }


  ngOnInit(): void {
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
    // this.fillData.attachment = this.ExteriorPicString

    let params = {
      "test_assignment_nid": this.testId,
      "test_assignment_question_type": "true_false",
      "question": this.fillData.question,
      "attachment": this.ExteriorPicString,
      "points": this.fillData.points,
      "checkstatus": "1",
      "correct_answer": this.fillData.correct_answer,
      'image_description': this.new_image_Description
    }

    console.log('params',params);

    this.isLoadingBool = true;
    this.service.post('add-question-api', params, 1).subscribe(result => {
      console.log('params',params);
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
      'question_pragraph_id': this.getQuestionId,
      "class_id": this.classId,
      "test_assignment_question_type": "true_false",
      "question": this.fillData.question,
      "attachment": this.ExteriorPicString,
      "points": this.fillData.points,
      "checkstatus": "1",
      "correct_answer": this.fillData.correct_answer,
      "previous_attachment_f_ids": old_attchment,
      'image_description':this.new_image_Description,
    }
    console.log('params',params);

    this.isLoadingBool = true;
    this.service.post('edit-question-api', params, 1).subscribe(result => {

      this.isLoadingBool = false;
      this.util.showSuccessAlert('Updated successfully');
      this.router.navigate(['/test/question-screen']);
    })
  }

  cancel(){
    this.router.navigate(['/test/question-screen']);
  }
}
