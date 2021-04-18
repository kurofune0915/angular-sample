import { HttpErrorResponse } from '@angular/common/http';

export abstract class BaseComponent {

  /** 画面ID. */
  protected readonly screenId: string;
  /** 表示言語コード. */
  protected dispLangCode?: string;
  /** メッセージ一覧. */
  messages: string[] = [];

  constructor(screenId: string) {
    this.screenId = screenId;
  }

  /**
   * メッセージを追加.
   *
   * @param message メッセージ
   */
  addMessage(message: string) {
    this.messages.push(message);
  }

  /**
   * メッセージをクリア.
   */
  clearMessages(): void {
    this.messages = [];
  }

  /**
   * XHRエラーハンドリング.
   *
   * @param e エラーオブジェクト
   */
  handleXhrError(e: any) {
    if (e instanceof HttpErrorResponse) {
      this.addMessage(e.message);
    } else if (e instanceof Error) {
      throw e;
    } else {
      throw new Error(e);
    }
  }
}