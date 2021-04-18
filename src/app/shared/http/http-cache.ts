import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * 通信時のキャッシュ.
 */
@Injectable()
export class HttpCache {

  /** HTTPヘッダ: キャッシュするかどうか. */
  static readonly HEADER_USE_CACHE: string = 'x_use_cache';
  /** データ. */
  private data: Map<string, HttpResponse<any>> = new Map<string, HttpResponse<any>>();

  /** キャッシュから取得. */
  get(cacheKey: string): HttpResponse<any> | undefined {
    return this.data.get(cacheKey);
  }

  /** キャッシュへセット. */
  set(cacheKey: string, value: HttpResponse<any>): void {
    this.data.set(cacheKey, value);
  }

  /** キャッシュを削除. */
  delete(cacheKey: string): void {
    this.data.delete(cacheKey);
  }
}