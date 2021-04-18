import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ErrorNavigator } from '../../error/error-navigator';
import { Logger } from '../logging/logger';

/**
 * HTTP通信時のインターセプタ.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpServiceInterceptor implements HttpInterceptor {

  constructor(
    private logger: Logger,
    private errorNavigator: ErrorNavigator
  ) { }

  /**
   * @inheritDoc
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const start: number = Date.now();
    let status: string;

    this.logger.log('request ====================>');
    this.logger.log(req);

    return next.handle(req).pipe(
      tap(
        event => {
          status = 'succeeded';
          if (event instanceof HttpResponse) {
            this.logger.log(event);
            this.logger.log('response <====================');
          }
        },
        error => {
          status = 'failed'
          this.logger.log(error);
          this.logger.log('error <====================');
          if (error instanceof HttpErrorResponse) {
            // blob取得時の挙動は各サービスで実装
            if (req.responseType === 'blob') {
              return;
            }
            // HTTPステータス400番台は各サービスで実装
            if (error.status >= 400 && error.status < 500) {
              return;
            }
            // システムエラー画面へ遷移
            this.errorNavigator.navigateSystemError();
          }
        }
      ),
      finalize(() => {
        const elapsed: number = Date.now() - start;
        this.logger.log(`${req.method} ${req.urlWithParams} ${status} in ${elapsed}ms`);
      })
    );
  }
}
