import { Component, OnInit } from '@angular/core';
import { ShapeComponent } from '../shape/shape.component';
import { ImageBox, MousePosition } from '../../model/shape';
import { ShapeType } from '../../model/shape-types';

import { Field } from 'dynaform';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent extends ShapeComponent implements OnInit {

    formFields: Field[] = [
        {
            name: 'x',
            label: 'X:',
            type: 'input',
            inputType: 'text',
            value: ''
        },
    ];

    constructor() {
        super();
        
        this.shape = new ImageBox();
        this.shapeType = ShapeType.Image;
    }

    ngOnInit() {
        
    }

    startDrawing(beginPosition: MousePosition): void {
        if (this.shape instanceof ImageBox) {
            this.shape.originX = beginPosition.x;
            this.shape.originY = beginPosition.y;
        }
        
    }

    draw(currentPosition: MousePosition): void {
        
        if (this.shape instanceof ImageBox) {
            this.shape.width = Math.abs(currentPosition.x - this.shape.originX);
            this.shape.height = Math.abs(currentPosition.y - this.shape.originY);
        }
    }

}
