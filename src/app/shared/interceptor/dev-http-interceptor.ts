import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Logger } from '../logging/logger';

/**
 * 開発用インターセプタ.
 */
@Injectable({
  providedIn: 'root'
})
export class DevHttpInterceptor implements HttpInterceptor {

  /** モック使用時の遅延ミリ秒. */
  private readonly MOCK_DELAY_TIME: number = 1000;

  constructor(
    private logger: Logger
  ) { }

  /**
   * @inheritDoc
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 本番環境はスルー
    if (environment.production) {
      return next.handle(req);
    }

    // モック使用
    if (this.isUsableMock()) {
      const mockReq: HttpRequest<any> = req.clone({
        url: this.buildMockUrl(req.url),
        method: this.convertToMethod(req)
      });
      return next.handle(mockReq).pipe(delay(this.MOCK_DELAY_TIME));;
    }

    // 開発サーバ
    const devReq: HttpRequest<any> = req.clone({
      url: this.buildDevBackendUrl(req.url)
    });
    return next.handle(devReq);
  }

  /**
   * モックを使用するか.
   *
   * @returns true:モック使用, false:モック不使用
   */
  private isUsableMock(): boolean {
    // 開発環境かつモックを使用する設定時のみ
    if (!environment.production && environment.useMock) {
      return true;
    }
    return false;
  }

  /**
   * HTTPリクエストメソッドをGETに書き換え.
   *
   * @param req HTTPリクエスト
   * @returns HTTPリクエストメソッド
   */
  private convertToMethod(req: HttpRequest<any>): string {
    if (req.method !== 'GET') {
      // モック使用時はJSONを取得するだけなのでGETに書き換える
      this.logger.log(`Change http method: ${req.method} => GET`);
      return 'GET';
    }
    return req.method;
  }

  /**
   * モック用URL変換.
   *
   * @param url URL
   * @returns モック用URL
   */
  private buildMockUrl(url: string): string {
    return `/mock/${url}.json`;
  }

  /**
   * 開発サーバURL変換.
   *
   * @param url URL
   * @returns 開発サーバURL
   */
  private buildDevBackendUrl(url: string): string {
    return `/backend/${url}`;
  }
}