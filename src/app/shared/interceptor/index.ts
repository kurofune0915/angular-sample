import { Provider } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DevHttpInterceptor } from './dev-http-interceptor';
import { HttpServiceInterceptor } from './http-service-interceptor';
import { HttpCacheInterceptor } from './http-cache-interceptor';

/** 開発用インターセプタ. */
export const devInterceptorProviders: Provider = environment.production ? [] : [{ provide: HTTP_INTERCEPTORS, useClass: DevHttpInterceptor, multi: true }];

/** HTTP通信インターセプタ. */
export const httpInterceptorProviders: Provider = [
  ...devInterceptorProviders,
  { provide: HTTP_INTERCEPTORS, useClass: HttpServiceInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true }
];