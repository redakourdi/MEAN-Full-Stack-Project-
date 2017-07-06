import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import { PageHeaderModule } from './../../shared';
import { BsComponentModule } from '../bs-component/bs-component.module';



@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        PageHeaderModule,

        BsComponentModule

    ],
    declarations: [TablesComponent]
})
export class TablesModule { }
