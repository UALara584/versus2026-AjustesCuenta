import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { StatsService } from '../../../../core/services/stats.service';
import { UserService } from '../../../../core/services/user.service';
import { PlayerStats } from '../../../../core/models/game.models';


export type NavKey = 'home' | 'play' | 'ranking' | 'profile' | 'settings' | 'admin' | 'users' | 'spiders' | 'reports';
export type TopbarUser = { name: string; xp: number; avatarUrl?: string | null };

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topbar.html',
})
export class TopbarComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly users = inject(UserService);
  private readonly statsApi = inject(StatsService);

  active = input<NavKey>('home');
  role = input<'player' | 'admin'>('player');
  user = input<TopbarUser | null>(null);

  private readonly stats = signal<PlayerStats[]>([]);


  items = computed<[NavKey, string][]>(() =>
    this.role() === 'admin'
      ? [['admin', 'Resumen'], ['users', 'Usuarios'], ['spiders', 'Spiders'], ['reports', 'Moderación']]
      : [['home', 'Inicio'], ['play', 'Jugar'], ['ranking', 'Ranking'], ['profile', 'Perfil']]
  );

  private routes: Record<NavKey, string | null> = {
    home: '/dashboard',
    play: '/play/select',
    ranking: null,
    profile: '/profile',
    settings: '/settings',
    admin: '/admin/dashboard',
    users: '/admin/users',
    spiders: '/admin/spiders',
    reports: '/admin/reports',
  };

  routeFor(k: NavKey): string | null {
    return this.routes[k];
  }

  readonly displayUser = computed<TopbarUser>(() => {
    const override = this.user();
    if (override) return override;
    const cached = this.auth.user();
    return {
      name: cached?.username ?? 'Jugador',
      avatarUrl: cached?.avatarUrl,
      xp: this.calculateXp(this.stats()),
    };
  });

  initials = computed(() => this.displayUser().name.slice(0, 2).toUpperCase());

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) return;
    this.users.me().subscribe({
      next: (u) => this.auth.updateCachedUser({ username: u.username, avatarUrl: u.avatarUrl, role: u.role }),
      error: () => {},
    });
    this.statsApi.mine().subscribe({
      next: (list) => this.stats.set(list ?? []),
      error: () => this.stats.set([]),
    });
  }

  private calculateXp(stats: PlayerStats[]): number {
    const games = stats.reduce((total, s) => total + s.gamesPlayed, 0);
    const wins = stats.reduce((total, s) => total + s.gamesWon, 0);
    const bestStreak = stats.reduce((best, s) => Math.max(best, s.bestStreak), 0);
    return games * 50 + wins * 150 + bestStreak * 25;
  }

}
