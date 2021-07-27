import { Directive, Input, ViewContainerRef, OnInit } from '@angular/core';
import { ShapeComponent } from '../components/shape/shape.component';
import { SharedServiceService } from '../shared-service.service';

@Directive({
    selector: '[dynamic-svg]'
})
export class DynamicSvgDirective {

    @Input() component: ShapeComponent;

    constructor(private viewContainerRef: ViewContainerRef, private shapeService: SharedServiceService) {
    }

    ngOnInit() {
        

        let shapeComponent: ShapeComponent = this.shapeService.getShapeComponent();
        this.viewContainerRef.createEmbeddedView(shapeComponent.shapeTemplate);
    }

    ngOnDestroy() {
        
        this.viewContainerRef.clear();
    }
}
