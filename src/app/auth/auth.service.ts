import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/http/http-service';
import { UserInfo } from '../shared/vo/user-info';
import { AuthVo } from './auth-vo';

/**
 * 認証サービス.
 */
@Injectable()
export class AuthService {

  constructor(
    private http: HttpService
  ) { }

  /**
   * ログイン.
   *
   * @param req リクエスト
   * @returns Observable<レスポンス>
   */
  login(req: AuthVo.Login.Request): Observable<AuthVo.Login.Response> {
    return this.http.post<AuthVo.Login.Request, AuthVo.Login.Response>('login', req);
  }
}
