import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageErrorComponent } from './no-page-error/no-page-error.component';
import { ScreenUrls } from './urls';

/** ルート */
const routes: Routes = [
  { path: ScreenUrls.AUTHENTICATION_ERROR, component: NoPageErrorComponent },
  { path: ScreenUrls.SYSTEM_ERROR, component: NoPageErrorComponent },
  { path: '**', component: NoPageErrorComponent }
];

/**
 * エラールーティングモジュール.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
