import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { BrowserModule  } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule , BrowserModule , Ng2FilterPipeModule 
    ],
    declarations: []
})
export class SharedPipesModule { }
