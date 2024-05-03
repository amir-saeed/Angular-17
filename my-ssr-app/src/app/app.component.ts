import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PLATFORM_ID, Inject, enableProdMode } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // if (isPlatformServer(this.platformId)) {
    //   enableProdMode();
    // }
  }
}