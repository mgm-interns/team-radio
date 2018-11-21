const MUTED_KEY = 'muted';
export class StationControllerLocaleStorageHelper {
  public static getMuted(): boolean {
    return Boolean(JSON.parse(localStorage.getItem(MUTED_KEY)));
  }

  public static setMuted(muted: boolean): void {
    localStorage.setItem(MUTED_KEY, JSON.stringify(muted));
  }
}
