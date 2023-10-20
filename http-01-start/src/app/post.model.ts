export interface PostsBEResponse {
  [key: string]: {
    content: string;
    title: string;
  }
}

export interface Post {
  id: string;
  content: string;
  title: string;
}
