import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public signin(payload: {email: string, password: string}): Observable<any>{
    return this.http.post<{token: string}>(`${this.url}/sign`, payload).pipe(
      map(data => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', data.token);
        return this.router.navigate(['admin']);
      }),
      catchError(e => {
        if(e.error.message){
          return throwError(() => e.error.message);
        }
        return throwError(() => "Falha na validação")
      })
    )
  }

  public logout(){
    localStorage.removeItem('acces_token');
    this.router.navigate([''])
  }
}
