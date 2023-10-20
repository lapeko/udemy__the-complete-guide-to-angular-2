import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, PostsBEResponse} from "./post.model";
import {API_URL} from "./consts";
import {map, tap} from "rxjs/operators";

const SERVICE_URL = `${API_URL}/posts.json`;

@Injectable({providedIn: "root"})
export class PostService {
  constructor(private http: HttpClient) {
  }

  postPost(post: Omit<Post, "id">) {
    return this.http.post<{name: string}>(SERVICE_URL, post);
  }

  getPosts() {
    return this.http.get<PostsBEResponse>(SERVICE_URL)
      .pipe(
        map(response => response ? Object.entries(response) : []),
        map(keyValueArray => keyValueArray.map(([key, value]) => ({id: key, ...value}) as Post)),
      )
  }

  deletePosts() {
    return this.http.delete(SERVICE_URL);
  }
}
