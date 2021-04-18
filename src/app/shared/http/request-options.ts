import { HttpParams } from '@angular/common/http';

/**
 * リクエストオプション.
 */
export interface RequestOptions {
  /** HTTPパラメータ. */
  httpParams?: HttpParams;
  /** キャッシュを使うか. */
  useCache?: boolean;
}