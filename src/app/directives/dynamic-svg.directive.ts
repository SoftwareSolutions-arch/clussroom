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
        console.log('DynamicSvgDirective ngOnInit() - component : ', this.component);

        let shapeComponent: ShapeComponent = this.shapeService.getShapeComponent();
        this.viewContainerRef.createEmbeddedView(shapeComponent.shapeTemplate);
    }

    ngOnDestroy() {
        console.log('DynamicSvgDirective ngOnDestroy()');
        this.viewContainerRef.clear();
    }
}
