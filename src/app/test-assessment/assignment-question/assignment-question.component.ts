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
  allImages = [];
  assignmentId: string;
  imagedata: any;
  isLoadingBool: boolean = false;
  questionButton = true;
  prevId: any = [];

  constructor(private route: ActivatedRoute, private service: SharedServiceService, private util: UtilService, private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
    this.route.queryParamMap.subscribe(queryParams => {
      this.assignmentId = queryParams.get("assignment_id");
    })
  }

  ngOnInit() {
    this.editData();
  }
  removeImages(index) {
    this.imagedata.attachment.splice(index, 1);
  }
  picked(event: any) {
    if (this.assignmentId) {
      if (this.ExteriorPicString.length + this.imagedata.length < 4) {
        console.log(this.ExteriorPicString.length + this.imagedata.length)
        if (event.target.files.length > 4) {
          alert('')
          this.util.errorAlertPopup('Can not select more than 4 images')
        }
  
        else {
          this.fileLists = FileList = event.target.files;
          // this.allImages.push(this.fileLists);
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
      }
      else {
        this.util.errorAlertPopup('Can not select more than 4 images');
      }
    }else{
      // if (this.ExteriorPicString.length < 4) {
      //   console.log(this.ExteriorPicString.length + this.imagedata.length)
        if (this.ExteriorPicString.length < 4) {
          this.fileLists = FileList = event.target.files;
          // this.allImages.push(this.fileLists);
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
      else {
        this.util.errorAlertPopup('Can not select more than 4 images');
      }
    }

  }

  handleInputChange(files) {
    var file = files;
    this.filename = file.name;
    this.allImages.push(this.filename);
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
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);
    this.allImages.splice(index, 1);
  }
  questionForm = new FormGroup({
    question: new FormControl('',),
  })

  // add update function
  addUpdateData() {
    if (this.assignmentId) {
      this.updateQuestion()
    } else {
      this.saveQuestion();
    }
  }
  // save questions api
  saveQuestion() {
    this.isLoadingBool = false;
    const data = {
      assignment_question: this.questionForm.value.question,
      assignment_id: sessionStorage.getItem('assignment_id'),
      assignment_attachments: this.ExteriorPicString,
      attachments_name: this.allImages
    }
    this.service.post('add-assignment-question-api', data, 1).subscribe(res => {
      if (res.status == '1') {
        this.isLoadingBool = false
        this.util.showSuccessAlert('Question added successfully');
        this.router.navigate(['/assignment/test-assignment-home']);
        this.questionForm.reset();
      }
    })
  }
  // patch data 
  editData() {
    var file = this.filesName
    const data = {
      assignment_question_id: this.assignmentId,
    }
    this.service.post('assignment-questions-listing', data, 1).subscribe(res => {
      this.assignmentData = res.result.questions
      this.imagedata = res.result.image_name
      res.result.attachments.forEach(element => {
        var id = element.id
        this.prevId.push(id)
      });
      this.questionForm.patchValue({
        question: this.assignmentData,
        // attachment: data.image,
      })
    })
  }
  // update question
  updateQuestion() {
    this.isLoadingBool = true;
    const data = {
      questions: this.questionForm.value.question,
      id: this.assignmentId,
      assignment_id: sessionStorage.getItem('assignment_id'),
      previous_fid: this.prevId,
      assignment_attachments: this.ExteriorPicString
    }
    this.service.post('update-assignment-question-api', data, 1).subscribe(res => {
      if (res.status == '1') {
        this.isLoadingBool = false;
        this.util.showSuccessAlert('Question added successfully');
        this.router.navigate(['/assignment/test-assignment-home']);
        this.questionForm.reset();
      }
    })
  }
}
