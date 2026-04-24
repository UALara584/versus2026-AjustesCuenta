import { Component, input, output } from '@angular/core';

@Component({
  selector: 'vs-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  readonly interactive = input<boolean>(false);
  readonly clicked = output<void>();

  handleClick(): void {
    if (this.interactive()) {
      this.clicked.emit();
    }
  }
}
