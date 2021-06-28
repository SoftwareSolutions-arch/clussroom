import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { UtilService } from 'src/providers/util.service';
import * as JSZip from 'jszip';  
import * as FileSaver from 'file-saver'; 
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
@Component({
  selector: 'app-learner-start-review',
  templateUrl: './learner-start-review.component.html',
  styleUrls: ['./learner-start-review.component.css']
})
export class LearnerStartReviewComponent implements OnInit {
  @ViewChild('attachments') attachment: any;
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  id: string;
  imagedata: any;
  assignmentData: any;
  ExteriorPicFile: any = [];
  ExteriorPicString: any = [];
  fileLists: any = [];
  fileList: File[] = [];
  listOfFiles: any[] = [];
  filename: any;
  audioSrc: any;
  allImages = [];
  filesName: any[];
  allImage: any[] = [];
  assignmentQuestionId: any;
  isLoadingBool: boolean = false;
  subData: any;
  attachmentData: any;
  attachmentDataName: any;
  attachmentDataNames: any;
  fileUrl;
  images: any;
  error: string;
  dragAreaClass: string;
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }
  constructor(private service: SharedServiceService,private sanitizer: DomSanitizer,private httpClient: HttpClient, private util: UtilService,private router: Router,private route: ActivatedRoute) { 
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit() {
    this.getDataById();
    this.preSubmissionData();
  }
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  saveFiles(files: FileList) {

    if (files.length > 1) this.error = "Only one file at time allow";
    else {
      this.error = "";
      var selectedFile =files[0];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name)
      this.filesName = this.listOfFiles
      this.handleInputChange(selectedFile);
      
    }
  }

downloadAll() {  
  this.createZip(this.imagedata.map(c => c.image), 'Image');  
} 
async createZip(files: any[], zipName: string) {  
  const zip = new JSZip();  
  const name = zipName + '.zip';  
  // tslint:disable-next-line:prefer-for-of  
  for (let counter = 0; counter < files.length; counter++) {  
    const element = files[counter];  
    const fileData: any = await this.getFile(element);  
    const b: any = new Blob([fileData], { type: '' + fileData.type + '' });  
    zip.file(element.substring(element.lastIndexOf('/') + 1), b);  
  }  
  zip.generateAsync({ type: 'blob' }).then((content) => {  
    if (content) {  
      FileSaver.saveAs(content, name);  
    }  
  });  
}   
async getFile(url: string) {  
  const httpOptions = {  
    responseType: 'blob' as 'json'  
  };  
  const res = await this.httpClient.get(url, httpOptions).toPromise().catch((err: HttpErrorResponse) => {  
    const error = err.error;  
    return error;  
  });  
  return res;  
}
  assignmentForm = new FormGroup({
    description : new FormControl('',)
  })
  answerForm = new FormGroup({
    answer: new FormControl('',)
  })
  getDataById(){
    const data = {
      "assignment_id":this.id
    }
    this.service.post('assignment-questions-listing',data,1).subscribe(res => {
      this.assignmentData = res.result[0].questions
      this.assignmentQuestionId = res.result[0].id
      this.imagedata =res.result[0].attachments
      
      this.attachmentDataNames = res.result[0].image_name
       this.assignmentForm.patchValue({
         description: this.assignmentData
       })
    })
  }
  // for submit data
  submitQuestions(){
    this.isLoadingBool = true;
    const data = {
      "assignment_id": this.id,
      "assignment_question_id":  this.assignmentQuestionId,
      "answer": this.answerForm.value.answer,
      "attachments": this.ExteriorPicString,
      is_submitted : '1',
      attachments_name : this.allImages

    }
    this.service.post('take-assignment-test-api',data,1).subscribe(res => {
       if(res.status == '1'){
        this.isLoadingBool = false;
        this.util.showSuccessAlert('Assignment Submitted Successfully');
        this.router.navigate(['/class-material/learner-assignment-listing']);
       }
    })
  }

  // for save data
 saveQuestions(){
    this.isLoadingBool = true;
    const data = {
      "assignment_id": this.id,
      "assignment_question_id":  this.assignmentQuestionId,
      "answer": this.answerForm.value.answer,
      "attachments": this.ExteriorPicString,
      is_submitted : '0',
      attachments_name : this.allImages

    }
    this.service.post('take-assignment-test-api',data,1).subscribe(res => {
       if(res.status == '1'){
        this.isLoadingBool = false;
        this.util.showSuccessAlert('Assignment Submitted Successfully');
        this.router.navigate(['/class-material/learner-assignment-listing']);
       }
    })
  }
  // attached attachments
  picked(event: any) {
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
  // add images
  addImages(){
  this.ExteriorPicFile
  }

  // pre submission data
  preSubmissionData(){
    var id = localStorage.getItem('submission_id');
    const data = {
      submission_id : id
    }
    this.service.post('previous-assignment-submission',data,1).subscribe(res => {
      this.subData = res.result;
      this.attachmentData = res.result.submission_attachments
      this.attachmentDataName = res.result.image_name
      this.answerForm.patchValue({
        answer : this.subData.answer
      })
    })
  }
// for back page
backPage(){
  this.router.navigate(['/class-material/assignment-detail-new'], { queryParams: { id: this.id} });  
}
}
