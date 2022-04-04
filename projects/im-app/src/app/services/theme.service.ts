import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2
  private colorTheme: string = "";
  private localStorageKey = "user-themee";
  private darkMode = "dark-mode";
  private lightMode = "light-mode";

  constructor(renderFactory: RendererFactory2) {
    this.renderer = renderFactory.createRenderer(null, null)
  }

  isDarkMode(): boolean {
    return this.colorTheme === this.darkMode;
  }

  initTheme() {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme)
  }

  setDarkMode() {
    this.update(this.darkMode);
  }

  setLightMode() {
    this.update(this.lightMode);
  }

  private update(theme: string){
    const previousColor = this.colorTheme;
    this.setColorTheme(theme);
    this.renderer.removeClass(document.body, previousColor);
    this.renderer.addClass(document.body, theme);
    console.log(previousColor + " - " + theme)
  }

  private setColorTheme(theme: string) {
    this.colorTheme = theme;

    // save to local storage
    localStorage.setItem(this.localStorageKey, theme);
  }

  private getColorTheme() {
    // get from local storage
    let temp = localStorage.getItem(this.localStorageKey);
    if (temp)
    {
      this.colorTheme = temp;
    } else {
      this.colorTheme = 'light-mode';
    }
  }
}
