import { Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'danger' | 'ghost';

@Component({
  selector: 'vs-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly disabled = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
}
