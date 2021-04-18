import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../shared/component/base-component';
import { SessionStorageUtil } from '../../shared/session/session-util';
import { AuthVo } from '../auth-vo';
import { AuthService } from '../auth.service';

/** 画面ID. */
const screenId: string = 'AS0001';

/**
 * AS0001/ログイン画面
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  /** ログインフォーム. */
  loginForm: FormGroup = new FormGroup({
    // ログインアカウント
    loginAccount: new FormControl(),
    // パスワード
    password: new FormControl()
  });

  /** 戻り先URL. */
  backURL: string | null = null;

  constructor(
    private service: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sessionStorageUtil: SessionStorageUtil
  ) {
    super(screenId);
  }

  ngOnInit(): void {
    // 言語コード取得
    this.dispLangCode =
      // 戻り先URL取得
      this.backURL = this.activatedRoute.snapshot.queryParams['backURL'];
  }

  /**
   * ログイン.
   */
  login(): void {
    // メッセージをクリア
    this.clearMessages();

    // リクエスト
    const req: AuthVo.Login.Request = {
      loginAccount: this.loginForm.get('loginAccount')?.value,
      password: this.loginForm.get('password')?.value
    }

    // ログイン処理
    this.service.login(req).subscribe(
      res => {
        // セッションストレージにユーザ情報を保存
        this.sessionStorageUtil.storeUserInfo(res.userInfo);

        // 戻り先URLが設定されている場合
        if (this.backURL) {
          this.router.navigate([this.backURL]);
          return;
        }
      },
      error => this.handleXhrError(error));
  }
}
