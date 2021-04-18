import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCache } from '../http/http-cache';
import { Logger } from '../logging/logger';

/**
 * 通信時のキャッシュのインターセプタ.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpCacheInterceptor implements HttpInterceptor {

  constructor(
    private httpCache: HttpCache,
    private logger: Logger
  ) { }

  /**
   * @inheritDoc
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const useCache: string | null = req.headers.get(HttpCache.HEADER_USE_CACHE);
    if (!useCache || useCache.toLowerCase() !== 'true') {
      // キャッシュしない
      return next.handle(req);
    }

    const cached: HttpEvent<any> | undefined = this.httpCache.get(req.urlWithParams);
    return cached ? this.returnCache(req.urlWithParams, cached) : next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // キャッシュする
          this.logger.log(`New cache set: ${req.urlWithParams}`);
        }
      })
    );
  }

  /**
   * キャッシュを返却.
   *
   * @param url URL
   * @param cached キャッシュされたレスポンス
   * @returns Observable<キャッシュされたレスポンス>
   */
  returnCache(url: string, cached: HttpResponse<any>): Observable<HttpResponse<any>> {
    this.logger.log(`Cache used: ${url}`);
    return of(cached);
  }
}