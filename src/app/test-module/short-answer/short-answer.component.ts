import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../providers/util.service';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-short-answer',
  templateUrl: './short-answer.component.html',
  styleUrls: ['./short-answer.component.css']
})
export class ShortAnswerComponent implements OnInit {
  isLoadingBool: boolean = false;
  fillData: any = {
    question: '',
    rich_text_responses_for_learner: '',
    character_limit: '',
    partial_point: '',
    points: '',
    attachment: '',
    test_assignment_question_type: "short_answer",
    insert_limit: "1000",
    test_assignment_nid: "",
  }
  imageSrc;
  ExteriorPicFile: any = [];
  ExteriorPicString: any = [];
  baseString: string = 'data:image/png;base64,';
  fileLists: any = [];
  @ViewChild('attachments') attachment: any;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  testId: any = '';
  getQuestionId: any;
  isEditQuestion: boolean;
  isImageShow: boolean = true;

  constructor(public util: UtilService, private route: ActivatedRoute, public service: SharedServiceService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    this.getQuestionId = this.route.snapshot.paramMap.get('id');
    this.getQuestionDetais();

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

  removeImage(index) {

    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
    this.ExteriorPicString.splice(index, 1);
  }

  removeImages(index) {
    this.fillData.attachment.splice(index, 1);
  }

  hideImage() {
    this.isImageShow = false
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
      "test_assignment_question_type": "short_answer",
      "question": this.fillData.question,
      "attachment": this.fillData.attachment,
      "rich_text_responses_for_learner": (this.fillData.rich_text_responses_for_learner == true) ? "1" : "0",
      "points": this.fillData.points,
      "character_limit": (this.fillData.character_limit == true) ? "1" : "0",
      "insert_limit": "1000",
      "partial_point": (this.fillData.partial_point == true) ? "1" : "0",

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
          rich_text_responses_for_learner: data.rich_text_responses,
          character_limit: data.character_limit,
          characterInput: data.character_limit,
          partial_point: data.partial_points,
          points: data.points,
          attachment: data.attachment,
          test_assignment_question_type: "short_answer",
          insert_limit: data.insert_limit,
          test_assignment_nid: data.id,
        }
      })
    }
  }

  // save question
  EditQuestion() {
    if (this.ExteriorPicString.length + this.fillData.attachment.length > 4) {
      this.util.errorAlertPopup('can not exceed more than four items')
    }

    else {
      var data = [];
      this.fillData.attachment.forEach(element => {
        data.push(element.id)
      });

      this.fillData.attachment = this.ExteriorPicString
      let params = {
        "question_pragraph_id": this.getQuestionId,
        "test_assignment_question_type": "edit_short_answer",
        "question": this.fillData.question,
        "attachment": this.fillData.attachment,
        "previous_attachment_f_ids": data,
        "rich_text_responses_for_learner": (this.fillData.rich_text_responses_for_learner == true) ? "1" : "0",
        "points": this.fillData.points,
        "character_limit": (this.fillData.character_limit == true) ? "1" : "0",
        "insert_limit": "1000",
        "partial_point": (this.fillData.partial_point == true) ? "1" : "0"
      }

      this.isLoadingBool = true;
      this.service.post('edit-question-api', params, 1).subscribe(result => {

        this.isLoadingBool = false;
        this.util.showSuccessAlert('Updated Successfully');
        this.router.navigate(['/test/question-screen']);
      })
    }
  }
}
