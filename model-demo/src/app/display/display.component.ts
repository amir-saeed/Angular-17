import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-display',
  template: `<h3>Hello, {{ displayName() }}!</h3>`
})
export class DisplayComponent {
  displayName = input.required<string>();
}