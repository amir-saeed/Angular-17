import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'user-theme';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const savedTheme = this.isBrowser ? (localStorage.getItem(this.themeKey) as 'light' | 'dark') || 'light' : 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme: 'light' | 'dark') {
    if (this.isBrowser) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.themeKey, theme);
    }
  }

  toggleTheme() {
    if (this.isBrowser) {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    }
  }
}
