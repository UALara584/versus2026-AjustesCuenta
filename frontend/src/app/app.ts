import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { audioService } from './core/services/AudioService';
import { AchievementToastsComponent } from './shared/components/achievement-toasts/achievement-toasts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AchievementToastsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private routeSub: Subscription | null = null;

  ngOnInit(): void {
    this.syncBgm(this.router.url);
    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.syncBgm(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private syncBgm(url: string): void {
    if (this.isGameRoute(url)) {
      audioService.stopBgm();
      return;
    }

    audioService.playBgm('bgm_menu');
  }

  private isGameRoute(url: string): boolean {
    const path = url.split(/[?#]/)[0] ?? '';
    return path === '/play/survival' || path === '/play/precision';
  }
}
