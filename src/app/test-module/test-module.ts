import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestRoutes } from './test-routes.routing';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,
        TestRoutes
    ],
    declarations: [
    ],
})
export class TestModule{

}