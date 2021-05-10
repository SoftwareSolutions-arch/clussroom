import { Component, OnInit, ViewChild } from '@angular/core';
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
    // characterInput: '',
    // partialPoints: '',
    points: '',
    attachment: '',
    "test_assignment_question_type": "short_answer",
    "insert_limit": "1000",
    "test_assignment_nid": "184",
  }

  imageSrc;

  ExteriorPicFile: any = [];

  ExteriorPicString: any = [];
  baseString: string = 'data:image/png;base64,';
  fileLists: any = [];

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];
  constructor(public util: UtilService, public service: SharedServiceService) { }

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
    console.log('fileList', this.fileList, this.listOfFiles)
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
    console.log('fileList2', this.fileList, this.listOfFiles)
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
    console.log('this.ExteriorPicString', this.ExteriorPicString);
  }

  // save question
  saveQuestion() {
    this.fillData.attachment = this.fileList
    console.log('this.',this.fillData.question)

    let params = {
      "test_assignment_nid": "184",
      "test_assignment_question_type": "short_answer",
      "question": this.fillData.question,
      "attachment": this.fillData.attachment,
      "rich_text_responses_for_learner": (this.fillData.rich_text_responses_for_learner == true) ? "1" : "0",
      "points": this.fillData.points,
      "character_limit": (this.fillData.character_limit == true) ? "1" : "0",
      "insert_limit": "1000"

    }
    // console.log('parmas', params);
    this.isLoadingBool = true;
    this.service.post('add-question-api', params, 1).subscribe(result => {
      console.log('result', result);
      this.util.showSuccessAlert('Answer Saved Successfully');
      this.isLoadingBool = false;
    })
  }
}
