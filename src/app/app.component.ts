import { Router } from '@angular/router';
import { Component, ContentChild, TemplateRef, OnInit, ComponentFactoryResolver, ViewContainerRef, Injector, ViewChild } from '@angular/core';
import { ShapeComponent } from './components/shape/shape.component';
import { ShapeProperties, MousePosition } from './model/shape';
import { ShapeType, ToolType } from './model/shape-types';
import { SharedServiceService } from './shared-service.service';
import { DynamicFormComponent } from 'dynaform';

import { Field } from 'dynaform';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'clussroom';

  myThumbnail = "https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef, public shapeService: SharedServiceService,
    public router: Router) {
    var data = localStorage.getItem('isLogin');
    if (data == '1') {
      // this.router.navigate(['/sample04']);
    }
  }

  ngOnInit(): void {
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('I promise to return this after 1 second!');
      }, 1000);
    });
    promise.then(function (value) {
      
    });
  }

  ngOnChanges() {
  }
}
