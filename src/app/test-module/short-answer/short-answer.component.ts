import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../providers/util.service';

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
    characterInput: '',
    partialPoints: '',
    points: '',
    attachment: '',
    "test_assignment_question_type": "short_answer",
    "insert_limit": "1000"
  }

  imageSrc;

  ExteriorPicFile: any = [];

  ExteriorPicString: any = [];
  baseString: string = 'data:image/png;base64,';
  fileList: any = []
  //json
  finalJson = {};

  currentId: number = 0;
  constructor(public util: UtilService) { }

  ngOnInit(): void {
  }

  public picked(event) {
    console.log('this.fileList.length', this.fileList);
    if (event.target.files.length < 5 && this.fileList.length < 4) {
      this.fileList = FileList = event.target.files;
      let i;
      for (i = 0; i < this.fileList.length; i++) {
        const file: File = this.fileList[i];
        this.ExteriorPicFile = file;
        this.handleInputChange(file); //turn into base64
      }
    }

    else {
      this.util.errorAlertPopup('You can only upload a maximum of 4 files')
    }
  }

  removeImage(i) {
    console.log('this.fileList', this.fileList, i)
    this.fileList = Array.from(this.fileList);
    this.fileList.splice(i, 1);
    console.log('this.fileList', this.fileList)
    this.ExteriorPicString.splice(i, 1);
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

  saveQuestion() {
    this.fillData.attachment = this.fileList
    console.log('afterfillData', this.fillData);
  }
}
