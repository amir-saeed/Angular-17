import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListComponent, AutoCompleteComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [ListComponent, AutoCompleteComponent],
})
export class SharedModule {}
