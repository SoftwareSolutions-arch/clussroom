import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    test_assignment_nid: "184",
    test_assignment_question_type: "true_false",
    question: "",
    attachment: "",
    points: "",
    checkstatus:"1",
    true_false_answers: [],
    correct_answer: ""
  }
  constructor(public util: UtilService, public service: SharedServiceService, private router: Router) { }


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
    this.fillData.attachment = this.fileList

    let params = {
      "test_assignment_nid": "184",
      "test_assignment_question_type": "true_false",
      "question": this.fillData.question,
      "attachment": this.fillData.attachment,
      "points": this.fillData.points,
      "checkstatus":"1",
      "true_false_answers":["1","2","4","8"],
      "correct_answer":this.fillData.correct_answer
    }
    
    this.isLoadingBool = true;
    this.service.post('add-question-api', params, 1).subscribe(result => {
      
      this.isLoadingBool = false;
      this.util.showSuccessAlert('Answer Saved Successfully');
      this.router.navigate(['/test/question-screen']);
    })
  }


}
