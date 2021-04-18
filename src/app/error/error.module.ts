import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ErrorRoutingModule } from './error-routing.module';
import { NoPageErrorComponent } from './no-page-error/no-page-error.component';

/**
 * エラーモジュール.
 */
@NgModule({
  declarations: [
    NoPageErrorComponent
  ],
  imports: [
    ErrorRoutingModule,
    SharedModule
  ],
  exports: [
    NoPageErrorComponent
  ]
})
export class ErrorModule { }
