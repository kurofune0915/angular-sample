/** ユーザー情報. */
export class UserInfo {

  /** ユーザーID. */
  userId: number;
  /** ログインアカウント. */
  loginAccount: string;

  /**
   * コンストラクタ.
   *
   * @param userId ユーザーID
   * @param loginAccount ログインアカウント
   */
  constructor(userId: number, loginAccount: string) {
    this.userId = userId;
    this.loginAccount = loginAccount;
  }
}