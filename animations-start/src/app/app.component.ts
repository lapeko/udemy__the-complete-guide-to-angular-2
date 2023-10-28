import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item: string) {
      this.list.push(item);
    }

  onDelete(item: string) {
    console.log('Not implemented');
  }
}
