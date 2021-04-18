import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/**
 * ページなしエラー.
 */
@Component({
  selector: 'no-page-error',
  templateUrl: './no-page-error.component.html',
  styleUrls: ['./no-page-error.component.scss']
})
export class NoPageErrorComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  /**
   * 前のページに戻る.
   */
  back(): void {
    this.location.back();
  }
}
