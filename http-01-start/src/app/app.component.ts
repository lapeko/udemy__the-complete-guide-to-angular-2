import { Component, OnInit } from '@angular/core';
import {Post} from "./post.model";
import {PostService} from "./post.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.postPost(postData).subscribe(console.log);
  }

  onFetchPosts() {
    this.fetchPosts()
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe();
  }

  private fetchPosts() {
    this.isLoading = true;
    this.postService.getPosts()
      .pipe(tap(() => this.isLoading = false))
      .subscribe(posts => this.loadedPosts = posts);
  }
}
