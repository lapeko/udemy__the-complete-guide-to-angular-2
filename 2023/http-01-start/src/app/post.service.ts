import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, PostsBEResponse} from "./post.model";
import {API_URL} from "./consts";
import {catchError, map} from "rxjs/operators";
import {of, Subject, throwError} from "rxjs";

const SERVICE_URL = `${API_URL}/posts.json`;

@Injectable({providedIn: "root"})
export class PostService {
  errorMessage$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  postPost(post: Omit<Post, "id">) {
    this.errorMessage$.next("");
    return this.http.post<{name: string}>(SERVICE_URL, post)
      .pipe(catchError(err => {
        this.errorMessage$.next(err.message ?? "An error occurred");
        return throwError(() => err);
      }));
  }

  getPosts() {
    this.errorMessage$.next("");
    return this.http.get<PostsBEResponse>(SERVICE_URL)
      .pipe(
        catchError(err => {
          this.errorMessage$.next(err.message ?? "An error occurred");
          return of({});
        }),
        map(response => response ? Object.entries(response) : []),
        map(keyValueArray => keyValueArray.map(([key, value]) => ({id: key, ...value}) as Post)),
      )
  }

  deletePosts() {
    this.errorMessage$.next("");
    return this.http.delete(SERVICE_URL)
      .pipe(catchError(err => {
        this.errorMessage$.next(err.message ?? "An error occurred");
        return throwError(() => err);
      }));
  }
}
