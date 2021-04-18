import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenUrls } from './urls';

/**
 * エラーナビゲータ.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorNavigator {

  constructor(
    private router: Router
  ) { }

  /**
   * 認証エラー画面へ遷移.
   */
  navigateAuthenticationError(): void {
    this.router.navigate([ScreenUrls.AUTHENTICATION_ERROR], { skipLocationChange: true });
  }

  /**
   * システムエラー画面へ遷移.
   */
  navigateSystemError(): void {
    this.router.navigate([ScreenUrls.SYSTEM_ERROR], { skipLocationChange: true });
  }
}