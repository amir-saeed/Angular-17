import { Component, model } from '@angular/core';
import { DisplayComponent } from '../display/display.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DisplayComponent],
  template: `
   <input [value]="userName()" (input)="updateUserName($event)">
    <app-display [displayName]="userName()"></app-display>
  `,
})
export class ProfileComponent {
  userName = model<string>('');

  updateUserName(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;  
    if (inputElement !== null) {
      this.userName.set(inputElement.value);
    }
  }
}
