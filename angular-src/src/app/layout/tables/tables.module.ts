import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import { PageHeaderModule } from './../../shared';
import { BsComponentModule } from '../bs-component/bs-component.module';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';



@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        PageHeaderModule,
        FormsModule,
        Ng2FilterPipeModule,
        BsComponentModule

    ],
    declarations: [TablesComponent]
})
export class TablesModule { }
