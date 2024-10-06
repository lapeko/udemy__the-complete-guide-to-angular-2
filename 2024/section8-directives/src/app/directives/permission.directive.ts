import {Directive, effect, inject, input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService, Role} from '../shared/services/auth.service';

@Directive({
  selector: "[appPermission]",
  standalone: true
})
export class PermissionDirective {
  roles = input.required<Role[]>({alias: "appPermission"})
  template = inject(TemplateRef)
  viewContainer = inject(ViewContainerRef)
  authService = inject(AuthService)

  constructor() {
    effect(() => {
      if (this.roles().includes(this.authService.role())) {
        this.viewContainer.createEmbeddedView(this.template);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
