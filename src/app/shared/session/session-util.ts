import { Injectable } from '@angular/core';
import { Logger } from '../logging/logger';
import { UserInfo } from '../vo/user-info';
import { SessionKey } from './session-key';

/**
 * セッションストレージユーティリティ.
 */
@Injectable()
export class SessionStorageUtil {

  constructor(
    private logger: Logger
  ) { }

  /**
   * ユーザー情報をセッションストレージに保存.
   *
   * @param userInfo ユーザー情報
   */
  storeUserInfo(userInfo: UserInfo): void {
    sessionStorage.setItem(SessionKey.USER_INFO, JSON.stringify(userInfo));
    this.logger.log(`SessionStorage set: ${SessionKey.USER_INFO}`);
    this.logger.log(userInfo);
  }

  /**
   * ユーザー情報をセッションストレージから削除.
   */
  removeUserInfo(): void {
    sessionStorage.removeItem(SessionKey.USER_INFO);
    this.logger.log(`SessionStorage remove: ${SessionKey.USER_INFO}`);
  }
}