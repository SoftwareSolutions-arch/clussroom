import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-assignment-question',
  templateUrl: './assignment-question.component.html',
  styleUrls: ['./assignment-question.component.css']
})
export class AssignmentQuestionComponent implements OnInit {
  @ViewChild('attachments') attachment: any;
  ExteriorPicFile: any = [];
  ExteriorPicString: any = [];
  fileLists: any = [];
  fileList: File[] = [];
  listOfFiles: any[] = [];
  filename: any;
  id: string;
  constructor(private route: ActivatedRoute,private service: SharedServiceService) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
   }

  ngOnInit() {
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
  handleInputChange(files) {
    var file = files;
    this.filename = file.name;
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
  removeImage(index) {

    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);

    this.ExteriorPicString.splice(index, 1);
  }
  questionForm = new FormGroup({
    question : new FormControl('',)
  })
  // save questions api
  saveQuestion(){
    const data = {
      assignment_question : this.questionForm.value.question,
      assignment_id : this.id,
      assignment_attachments: this.ExteriorPicString
    }
    this.service.post('add-assignment-api', data, 1).subscribe(res => {
    })
  }
}
