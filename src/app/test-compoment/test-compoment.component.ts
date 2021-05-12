import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-test-compoment',
  templateUrl: './test-compoment.component.html',
  styleUrls: ['./test-compoment.component.css']
})
export class TestCompomentComponent {
  movies = [{
    name: 'Episode I - The Phantom Menace',
    isDisable: false
  }, {
    name: 'Episode II - Attack of the Clones',
    isDisable: false
  }, {
    name: 'Episode III - Revenge of the Sith',
    isDisable: false
  }, {
    name: 'Episode IV - A New Hope',
    isDisable: false
  }, {
    name: 'Episode V - The Empire Strikes Back',
    isDisable: false
  }, {
    name: 'Episode VI - Return of the Jedi',
    isDisable: false
  }
  ];
  constructor() { }

  delete(index: any) {
    this.movies.splice(index, 1);
  }

  addNew() {
    this.movies.push({
      name: 'new item',
      isDisable: false
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}