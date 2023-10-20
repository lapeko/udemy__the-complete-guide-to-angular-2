import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, PostsBEResponse} from "./post.model";
import {API_URL} from "./consts";
import {map, tap} from "rxjs";

@Injectable({providedIn: "root"})
export class PostService {
  constructor(private http: HttpClient) {
  }

  postPost(post: Omit<Post, "id">) {
    return this.http.post<{name: string}>(`${API_URL}/posts.json`, post);
  }

  getPosts() {
    return this.http.get<PostsBEResponse>(`${API_URL}/posts.json`)
      .pipe(
        map(response => Object.entries(response)),
        map(keyValueArray => keyValueArray.map(([key, value]) => ({id: key, ...value}) as Post)),
      )
  }
}
