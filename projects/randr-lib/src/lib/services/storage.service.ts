import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;

  constructor() {
      this.storage = sessionStorage; // localStorage;
  }

  public retrieve(key: string): any {
      const item = this.storage.getItem(key);

      if (item && item !== 'undefined') {
          return JSON.parse(item);
      }

      return;
  }

  public store(key: string, value: any) {
      this.storage.setItem(key, JSON.stringify(value));
  }
}
