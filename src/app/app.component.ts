import { Component, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { remult } from 'remult';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';


@Component({
    selector: 'app-root',
    imports: [ RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ERP-APP';

  constructor(
    zone: NgZone, 
    public themeService: ThemeService) {
    remult.apiClient.wrapMessageHandling = (handler) =>
      zone.run(() => handler());
  }
}
