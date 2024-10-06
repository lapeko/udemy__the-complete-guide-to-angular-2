import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ng-universal-demo';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get("/api/users").subscribe(res => console.log(res));
  }
}
