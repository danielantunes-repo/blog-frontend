import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/login.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // API = environment.SERVIDOR+'/api/post';
  API = 'https://blog-backend-montreal.up.railway.app'+'/api/post'

  constructor(private http: HttpClient, private loginService: LoginService) {}

  createPost(data: any): Observable<any> {
    return this.http.post(this.API + '/create', data);
  }

  editPost(post: Post, id: number): Observable<string> {
    return this.http.put<string>(this.API + '/' + id, post, {
      responseType: 'text' as 'json',
    });
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API + '/');
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(this.API + '/' + id);
  }

  deletePost(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/' + id);
  }

  getTotalPosts(): Observable<number> {
    return this.http.get<number>(this.API + '/todos');
  }

  getPostCountByUser(): Observable<any[]> {
    return this.http.get<any[]>(this.API + '/count');
  }
}
