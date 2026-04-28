import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-curator-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feed-wrapper">
      <div id="curator-feed-default-feed-layout"></div>
    </div>
  `,
  styles: [`
    .feed-wrapper {
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class CuratorFeedComponent implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCuratorScript();
    }
  }

  private loadCuratorScript(): void {
    if (document.getElementById('curator-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'curator-script';
    script.src = 'https://cdn.curator.io/published/a88bd1fd-b6c4-4825-853d-9dd1d0288de9.js';
    script.async = true;
    script.charset = 'UTF-8';

    document.body.appendChild(script);
  }
}
