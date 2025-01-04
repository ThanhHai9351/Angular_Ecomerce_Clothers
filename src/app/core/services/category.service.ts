import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, ICategory } from '@app/core/model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl: string = 'http://localhost:3001/api'
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<APIResponse<ICategory[]>> {
    return this.http.get<APIResponse<ICategory[]>>(`${this.apiUrl}/category`);
  }
}
