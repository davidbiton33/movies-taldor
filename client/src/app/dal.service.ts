import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class DalService {
  readonly apiUrl = 'http://localhost:3000/api/movies';
  constructor(private http:HttpClient) {}

  getAll(){
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getByCategory(category) : Observable<Movie[]>
  {
    return this.http.get<Movie[]>(`${this.apiUrl}/${category}`);
  }

  getCategories() : Observable<string[]>
  {
    return this.http.get<string[]>(`${this.apiUrl}/caegories`);
  }

  addMovie(movie:Movie)
  {
    return this.http.post(this.apiUrl, movie);
  }

  deleteItem(id: number|string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }



}
