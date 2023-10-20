import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_URL} from "./consts";
import {map, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post(`${API_URL}/posts.json`, postData).subscribe(console.log);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get(`${API_URL}/posts.json`)
      .pipe(
        map(response => Object.entries(response)),
        map(keyValueArray => keyValueArray.map(([key, value]) => ({id: key, ...value})))
      )
      .subscribe(console.log);
  }
}
