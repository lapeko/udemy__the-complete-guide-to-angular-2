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
  answer = "";
  sexArr = ["male", "female"];

  suggestUserName() {
    // this.form.setValue({
    //   userGroup: {
    //     username: "username",
    //     email: "email@mail.com",
    //   },
    //   questionAnswer: "aiug sdakjhlsd dsfkjlsdf fdslkj",
    //   secret: "pet",
    //   sex: "male",
    // })
    this.form.form.patchValue({
      userGroup: {
        username: "username",
      },
    })
  }

  submit() {
    console.log(this.form);
  }
}

// TODO Disable button if invalid.  Mark all inputs red if they are invalid
