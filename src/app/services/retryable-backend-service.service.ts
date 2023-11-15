import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBackendResponse } from '../interfaces/IBackendResponse';
import { Observable, catchError, switchMap, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RetryableBackendServiceService {
  constructor(private http: HttpClient) {}

  // TO BE changed to real backend url
  url = 'https://randomuser.me/api/';

  fetchData(): Observable<IBackendResponse> {
    return this.http.get<IBackendResponse>(this.url).pipe(
      switchMap((response) => {
        if (!response.ready) throw new Error('Data not ready');
        return of(response);
      }),
      catchError(() => of({ ready: false }))
    );
  }
}
