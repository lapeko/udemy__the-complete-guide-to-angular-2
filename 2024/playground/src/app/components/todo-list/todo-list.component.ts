import {Attribute, Component, HostAttributeToken, inject} from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  name: string = inject(new HostAttributeToken("name"))
  description: string;

  constructor(@Attribute("description") description: string) {
    this.description = description;
  }
}
