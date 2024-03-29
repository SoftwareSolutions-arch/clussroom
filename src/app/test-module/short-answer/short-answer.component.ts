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
  new_image_Description = [];
  new_attachment: any = [];
  constructor(public util: UtilService, private route: ActivatedRoute, public service: SharedServiceService, private router: Router) {
    this.testId = localStorage.getItem('test_id');
    this.getQuestionId = this.route.snapshot.paramMap.get('id');
    this.getQuestionDetais();

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
        console.log('result', result)
        var data = result.question_data[0]
        this.fillData = {
          question: data.paper_summary,
          rich_text_responses_for_learner: data.rich_text_responses,
          character_limit: data.character_limit,
          partial_point: data.partial_points,
          points: data.points,
          attachment: data.attachment,
          test_assignment_question_type: "short_answer",
          characterInput: data.insert_limit,
          test_assignment_nid: data.id,
          old_image_Description: data.image_description

        }
      })
    }
  }

  ngOnInit(): void {
  }

  picked(event: any) {
    if (this.fillData.attachment == null) {
      this.fillData.attachment = [];
    }
    if (this.ExteriorPicString.length + this.fillData.attachment.length < 4) {
      if (event.target.files.length > 4) {
        this.util.errorAlertPopup('Can not select more than 4 images');
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
    console.log('new_image_Description', this.new_image_Description)
    let params = {
      "test_assignment_nid": this.testId,
      "test_assignment_question_type": "short_answer",
      "question": this.fillData.question,
      "attachment": this.ExteriorPicString,
      "rich_text_responses_for_learner": (this.fillData.rich_text_responses_for_learner == true) ? "1" : "0",
      "points": this.fillData.points,
      "character_limit": (this.fillData.character_limit == true) ? "1" : "0",
      "insert_limit": this.fillData.characterInput,
      "partial_point": (this.fillData.partial_point == true) ? "1" : "0",
      'image_description': this.new_image_Description
    }

    console.log('params', params)

    this.isLoadingBool = true;
    this.service.post('add-question-api', params, 1).subscribe(result => {
      console.log('result', result)
      this.isLoadingBool = false;
      this.util.showSuccessAlert('Question saved successfully');
      this.router.navigate(['/test/question-screen']);
    })
  }

  // save question
  EditQuestion() {
    if (this.ExteriorPicString.length + this.fillData.attachment.length > 4) {
      this.util.errorAlertPopup('can not exceed more than four items')
    }

    else {
      if (this.fillData.attachment != null) {
        var old_attchment = [];
        this.fillData.attachment.forEach(element => {
          old_attchment.push({
            'id': element.id,
            'image_description': element.image_description
          })
        });
      }


      let params = {
        "question_pragraph_id": this.getQuestionId,
        "test_assignment_question_type": "edit_short_answer",
        "question": this.fillData.question,
        "attachment": this.ExteriorPicString,
        'image_description': this.new_image_Description,
        "previous_attachment_f_ids": old_attchment,
        "rich_text_responses_for_learner": (this.fillData.rich_text_responses_for_learner == true) ? "1" : "0",
        "points": this.fillData.points,
        "character_limit": (this.fillData.character_limit == true) ? "1" : "0",
        "insert_limit": this.fillData.characterInput,
        "partial_point": (this.fillData.partial_point == true) ? "1" : "0"
      }

      console.log('params', params)
      this.isLoadingBool = true;
      this.service.post('edit-question-api', params, 1).subscribe(result => {
        console.log('params', params);
        this.isLoadingBool = false;
        this.util.showSuccessAlert('Updated Successfully');
        this.router.navigate(['/test/question-screen']);
      })
    }
  }
}
