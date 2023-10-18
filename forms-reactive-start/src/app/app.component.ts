import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
  form = this.fb.group({
    userGroup: this.fb.group({
      userName: this.fb.control("", Validators.required),
      email: this.fb.control("", [Validators.email, Validators.required]),
    }),
    gender: this.fb.control(this.genders[0]),
    hobbies: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {
  }

  get hobbies() {
    return (<FormArray>this.form.get('hobbies')).controls;
  }

  addHobby() {
    (<FormArray>this.form.get('hobbies')).push(this.fb.control("", Validators.required));
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
