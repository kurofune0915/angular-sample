import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportLanguage } from 'src/config/support-language';

/**
 * 共有サービス.
 */
@Injectable()
export class SharedService {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  /**
   * 表示言語コードを取得.
   */
  getDispLangCode(): string {
    let dispLangCode: string = this.activatedRoute.snapshot.queryParams['dispLangCode'];
    if (!dispLangCode) {
      dispLangCode = SupportLanguage.English;
    }
  }

  /**
   * TOPページへ遷移.
   */
}
