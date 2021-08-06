import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//import { Subject } from 'rxjs';

@Injectable()
export class AssignmentService {
  // Observable string sources
  private componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod(count:number, type :String) {
    this.componentMethodCallSource.next({count: count ,type:type});
  }
}
