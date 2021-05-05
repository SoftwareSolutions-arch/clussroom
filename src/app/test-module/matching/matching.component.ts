import { UtilService } from '../../../providers/util.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {
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
  fileLists: any = [];

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];
  constructor(public util: UtilService) { }


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

  saveQuestion() {
    this.fillData.attachment = this.fileList
    console.log('afterfillData', this.fillData);
  }

}
