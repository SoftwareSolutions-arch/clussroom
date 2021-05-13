import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SharedServiceService } from '../../shared-service.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../providers/util.service';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css']
})
export class MultipleChoiceQuestionComponent implements OnInit {
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
    test_assignment_question_type: "mcq",
    question: "",
    attachment: [],
    mcq_option_text: [],
    mcq_option_check: [],
    jumble_questions_placement: "",
    points: "",
    partial_points: ""
  }
  myForm: FormGroup;
  arr: FormArray;
  constructor(public util: UtilService, private router: Router, private fb: FormBuilder, public service: SharedServiceService) { }

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


  ngOnInit() {
    this.myForm = this.fb.group({
      arr: this.fb.array([this.createItem()])
    })
  }

  createItem() {
    return this.fb.group({
      question: [''],
      question_checkbox: ['']
    })
  }

  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  deleteUser(skillIndex) {
    if (skillIndex > 0) {
      this.arr.removeAt(skillIndex);
    }
  }

  saveQuestion() {

    this.fillData.mcq_option_text=[];
    this.fillData.mcq_option_check=[];

    this.myForm.value.arr.forEach(element => {
      this.fillData.mcq_option_text.push(element.question);
      this.fillData.mcq_option_check.push((element.question_checkbox == true) ? "1" : "0");
    });
    this.fillData.attachment = this.fileList;
    this.fillData.partial_points = ((this.fillData.partial_points == true) ? "1" : "0")
    this.fillData.jumble_questions_placement = ((this.fillData.jumble_questions_placement == true) ? "1" : "0")

    console.log('this.fillData', this.fillData);

   
    this.isLoadingBool = true;
    this.service.post('add-question-api', this.fillData, 1).subscribe(result => {
      console.log('result', result);
      this.util.showSuccessAlert(result.message);
      this.isLoadingBool = false;
      this.router.navigate(['/test/question-screen']);
    })
  }

}
