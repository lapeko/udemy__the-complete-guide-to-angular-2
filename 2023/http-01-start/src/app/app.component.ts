import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {PostService} from "./post.service";
import {finalize, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  errorMessage = "";
  loadedPosts: Post[] = [];
  isLoading = false;
  private _destroy$ = new Subject<void>();

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
    this.postService.errorMessage$
      .pipe(takeUntil(this._destroy$))
      .subscribe(error => this.errorMessage = error);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.isLoading = true;
    this.postService.postPost(postData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: ({name}) => this.loadedPosts.push({id: name, ...postData}),
        error: () => {},
      });
  }

  onFetchPosts() {
    this.fetchPosts()
  }

  onClearPosts() {
    this.isLoading = true;
    this.postService.deletePosts()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => this.loadedPosts = [],
        error: () => {},
      });
  }

  hideErrorAlert() {
    this.errorMessage = "";
  }

  private fetchPosts() {
    this.isLoading = true;
    this.postService.getPosts()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: posts => this.loadedPosts = posts,
        error: () => this.loadedPosts = [],
      });
  }
}
