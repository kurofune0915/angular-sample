import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * 開発環境にのみ出力するロガー.
 */
@Injectable({
  providedIn: 'root'
})
export class Logger {

  log(msg: any): void {
    this.devLog(() => console.log(msg));
  }

  debug(msg: any): void {
    this.devLog(() => console.debug(msg));
  }

  info(msg: any): void {
    this.devLog(() => console.info(msg));
  }

  error(msg: any): void {
    this.devLog(() => console.error(msg));
  }

  /** 開発環境にのみ出力. */
  private devLog(log: () => void) {
    if (environment.production) {
      return;
    }
    log();
  }
}