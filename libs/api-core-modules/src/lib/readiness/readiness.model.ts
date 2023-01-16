export class ApplicationReadiness {
  private static instance: ApplicationReadiness;
  private _isReady: boolean;

  private constructor() {
    this._isReady = false;
  }

  public static getInstance(): ApplicationReadiness {
    return this.instance || (this.instance = new this());
  }

  public set isReady(value: boolean) {
    this._isReady = value;
  }

  public get isReady(): boolean {
    return this._isReady;
  }
}
