import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(
    type: 'users' | 'doctors' | 'hospitals',
    term: string
  ): Observable<User[]> {
    const url = `${base_url}/all/collection/${type}/${term}`;
    return this.http.get(url, this.headers).pipe(
      map((res: { ok: boolean; results: any[] }) => {
        const users = res.results.map(
          (item: User) =>
            new User(
              item.name,
              item.email,
              null,
              item.img,
              item.google,
              item.uid,
              item.role
            )
        );
        return users;
      })
    );
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
}