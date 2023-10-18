import {Component} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
  form = this.fb.group({
    userName: new FormControl(""),
    email: new FormControl(""),
    gender: new FormControl(this.genders[0])
  });

  constructor(private fb: FormBuilder) {
  }
}
