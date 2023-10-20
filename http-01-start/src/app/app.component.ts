import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_URL} from "./consts";
import {map, Observable, of, tap} from "rxjs";
import {Post, PostsBEResponse} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts()
      .subscribe(posts => this.loadedPosts = posts);
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post(`${API_URL}/posts.json`, postData).subscribe(console.log);
  }

  onFetchPosts() {
    this.fetchPosts()
      .subscribe(posts => this.loadedPosts = posts);
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isLoading = true;
    return this.http.get<PostsBEResponse>(`${API_URL}/posts.json`)
      .pipe(
        map(response => Object.entries(response)),
        map(keyValueArray => keyValueArray.map(([key, value]) => ({id: key, ...value}) as Post)),
        tap(() => this.isLoading = false)
      )
  }
}
