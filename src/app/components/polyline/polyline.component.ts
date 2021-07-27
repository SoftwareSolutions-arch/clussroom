import { Component, OnInit } from '@angular/core';
import { ShapeComponent } from '../shape/shape.component';
import { PolyLine, MousePosition } from '../../model/shape';
import { ShapeType } from '../../model/shape-types';

import { Field } from 'dynaform';

@Component({
    selector: 'app-polyline',
    templateUrl: './polyline.component.html',
    styleUrls: ['./polyline.component.css']
})
export class PolyLineComponent extends ShapeComponent implements OnInit {
    formFields: Field[] = [
        {
            name: 'x',
            label: 'X:',
            type: 'input',
            inputType: 'text',
            value: ''
        },
    ];

    value: string = '';
    lastPoint: MousePosition;
    currentPoint: MousePosition;
    hasPoints: boolean = false;

    constructor() {
        super();
        this.shape = new PolyLine();
        this.shapeType = ShapeType.PolyLine;
        

    }

    ngOnInit() {
        
    }

    setStyles() {
        let styles = {
            'fill': 'none',
            'stroke': this.shape.shapeProperties.strokeColor,
            'stroke-width': this.shape.shapeProperties.strokeWidth
        };
        return styles;
    }

    setPoint(point: MousePosition): void {
        if (this.shape instanceof PolyLine) {
            this.lastPoint = Object.assign({}, point);
            this.shape.points.push(this.lastPoint);
            
            this.value += point.x + "," + point.y + " ";
            
        }
    }

    draw(currentPosition: MousePosition): void {
        if (this.shape instanceof PolyLine) {
            this.currentPoint = Object.assign({}, currentPosition);
            this.hasPoints = true;
            
        }
    }

    endDrawing(): void {
        this.currentPoint = this.lastPoint;
    }
}
