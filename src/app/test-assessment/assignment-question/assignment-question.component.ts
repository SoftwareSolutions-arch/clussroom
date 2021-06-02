import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';

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
  assignmentData: any;
  filesName: any[];
  audioSrc: any;
  constructor(private route: ActivatedRoute, private service: SharedServiceService, private util: UtilService, private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.editData();
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
      this.filesName = this.listOfFiles
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

  _handleReaderLoaded(e, index) {
    let reader = e.target;
    this.audioSrc = reader.result
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
    question: new FormControl('',)
  })
  // save questions api
  saveQuestion() {
    const data = {
      assignment_question: this.questionForm.value.question,
      assignment_id: sessionStorage.getItem('assignment_id'),
      assignment_attachments: this.ExteriorPicString
    }
    this.service.post('add-assignment-question-api', data, 1).subscribe(res => {
      if (res.status == '1') {
        this.util.showSuccessAlert('Question added successfully');
        this.router.navigate(['/assignment/test-assignment-home']);
        this.questionForm.reset();
        this.ExteriorPicString = '';
      }
    })
  }
  // patch data 
  editData() {
    var file = this.filesName
    const data = {
      assignment_id: this.id,
    }
    this.service.post('assignment-questions-listing', data, 1).subscribe(res => {
      this.assignmentData = res.result[0]
      // for(let i =0; i<this.assignmentData.attachments.length; i++){
      //       const data = this.assignmentData.attachments
      //       this.questionForm.patchValue({
      //       audio : data.image
      //       })     
      // }
      var data = res.attachments[0]
      this.questionForm.patchValue({
        question: this.assignmentData.questions,
        attachment: data.attachment,
      })
    })
  }
}
