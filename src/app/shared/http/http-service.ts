import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions } from './request-options';
import { HttpCache } from './http-cache';

/**
 * HTTP接続サービス.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /** GET. */
  get<T>(url: string, options?: RequestOptions): Observable<T> {
    let headers: HttpHeaders = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });
    const params: HttpParams | undefined = options ? options.httpParams : undefined;

    if (options && options.useCache) {
      // キャッシュを使用する設定
      headers = headers.set(HttpCache.HEADER_USE_CACHE, 'true');
    }
    return this.httpClient.get<T>(url, {
      headers: headers,
      params: params
    });
  }

  /** POST. */
  post<T, U>(url: string, body: T, options?: RequestOptions): Observable<U> {
    let headers: HttpHeaders = new HttpHeaders();
    if (options && options.useCache) {
      // キャッシュを使用する設定
      headers = headers.set(HttpCache.HEADER_USE_CACHE, 'true');
    }
    return this.httpClient.post<U>(url, body, { headers: headers });
  }

  /** POST(Blob取得). */
  postForBlob<T>(url: string, body: T): Observable<Blob> {
    let headers = { 'Content-Type': 'application/json', 'Accept': 'application/octet-stream' };
    return this.httpClient.post(url, body, { responseType: 'blob', headers: headers })
  }

  /** POST(Blob取得)※HTTPレスポンス付. */
  postForBlobWithResponse<T>(url: string, body: T): Observable<HttpResponse<Blob>> {
    let headers = { 'Content-Type': 'application/json', 'Accept': 'application/octet-stream' };
    return this.httpClient.post(url, body, { responseType: 'blob', observe: 'response', headers: headers })
  }
}