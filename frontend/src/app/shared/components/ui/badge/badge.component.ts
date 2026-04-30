import { Component, computed, input } from '@angular/core';

export type GameMode =
  | 'survival'
  | 'precision'
  | 'binary-duel'
  | 'precision-duel'
  | 'sabotage';

const MODE_COLORS: Record<GameMode, string> = {
  survival:         'var(--vs-accent-red)',
  precision:        'var(--vs-accent-blue)',
  'binary-duel':    'var(--vs-accent-gold)',
  'precision-duel': 'var(--vs-accent-green)',
  sabotage:         'var(--vs-accent-purple)',
};

@Component({
  selector: 'vs-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  readonly mode = input<GameMode | null>(null);
  readonly label = input<string>('');
  readonly color = input<string>('');

  readonly resolvedColor = computed(() => {
    const m = this.mode();
    return m ? MODE_COLORS[m] : this.color() || 'var(--vs-text-secondary)';
  });

  readonly resolvedLabel = computed(() => {
    const m = this.mode();
    if (m) return m.replace('-', ' ');
    return this.label();
  });
}
