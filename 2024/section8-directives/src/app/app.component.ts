import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {AuthService} from './shared/services/auth.service';
import {PermissionDirective} from './directives/permission.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PermissionDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authService = inject(AuthService);
}
