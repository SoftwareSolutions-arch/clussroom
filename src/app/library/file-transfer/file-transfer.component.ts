import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UtilService } from '../../../providers/util.service';

@Component({
  selector: 'app-file-transfer',
  templateUrl: './file-transfer.component.html',
  styleUrls: ['./file-transfer.component.css']
})
export class FileTransferComponent implements OnInit {
  userId: any = '';
  isLoadingBool: boolean = true;
  libraryTypeFirst: any = 'main';
  libraryTypeSecond: any = 'personal';
  libraryData: any = '';
  libraryDataSecond: any = '';

  constructor(public service: SharedServiceService, public util: UtilService) {
    this.userId = localStorage.getItem('uid');
    this.getMainListing('first');
    this.getMainListing('second');
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnInit(): void {
  }

  getMainListing(data) {
    if (this.libraryTypeFirst != this.libraryTypeSecond) {
      if (data == 'first') {
        let params = {
          "user_id": this.userId,
          "type": this.libraryTypeFirst
        }
        console.log('params', params);
        this.isLoadingBool = true;
        this.service.post('vendor_library_listing', params, 1).subscribe(result => {
          this.isLoadingBool = false;
          this.libraryData = result.result;
          console.log('result', result);
        })
      }
      else {
        let params = {
          "user_id": this.userId,
          "type": this.libraryTypeSecond
        }
        console.log('params', params);
        this.isLoadingBool = true;
        this.service.post('vendor_library_listing', params, 1).subscribe(result => {
          console.log('result', result);
          this.isLoadingBool = false;
          this.libraryDataSecond = result.result;
        })
      }
    }
    else {
      this.util.showSuccessToast('please select different library')
    }
  }
}
