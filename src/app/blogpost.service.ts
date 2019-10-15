import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Blogpost } from './models/blogpost';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  baseUrl = 'http://localhost:3000/api/v1/blog-posts';
  private blogpostCreated = new Subject<String>();

  constructor(private httpClient: HttpClient) { }

  createBlogpost(blogpost: Blogpost) {
    return this.httpClient.post<Blogpost>(this.baseUrl, blogpost);
  }

  uploadImage(formData: FormData) {
    return this.httpClient.post<any>(`${this.baseUrl}/images`, formData);
  }

  dispatchBlogpostCreated(id: string) {
    this.blogpostCreated.next(id);
  }

  handleBlogpostCreated() {
    return this.blogpostCreated.asObservable();
  }

  getBlogposts(): Observable<Blogpost[]> {
    return this.httpClient.get<Blogpost[]>(`${this.baseUrl}/`);
  }

  getBlogpostById(id): Observable<Blogpost> {
    return this.httpClient.get<Blogpost>(`${this.baseUrl}/${id}`);
  }

  updateBlogpost(id: string, blogpost: Blogpost){
    return this.httpClient.put(`${this.baseUrl}/${id}`, blogpost);
  }

  deleteSingleBlogpost(id: String) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  deleteBlogposts(ids: string[]) {
    const allIds = ids.join(',');
    return this.httpClient.delete(`${this.baseUrl}/?ids=${allIds}`);
  }
}
