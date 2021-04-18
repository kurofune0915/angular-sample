import { UserInfo } from '../shared/vo/user-info';

/** 認証関連VO. */
export namespace AuthVo {
  /** ログイン. */
  export namespace Login {
    /** リクエスト. */
    export interface Request {
      /** ログインアカウント. */
      loginAccount: string;
      /** パスワード. */
      password: string;
    }
    /** レスポンス. */
    export interface Response {
      /** ユーザー情報. */
      userInfo: UserInfo;
    }
  }
}