import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') form: NgForm;
  defaultSelectValue = "pet";

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  submit() {
    console.log(this.form);
  }
}

// TODO Disable button if invalid.  Mark all inputs red if they are invalid
