import { Component, input } from '@angular/core';

@Component({
  selector: 'vs-divider',
  standalone: true,
  imports: [],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
})
export class DividerComponent {
  readonly accent = input<boolean>(false);
}
