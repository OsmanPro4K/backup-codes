import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  signUpUser(
    email: string,
    password: string,
    backupCodes: number[]
  ): Observable<any> {
    const url = 'http://localhost:3000/signup/api';
    const body = {
      email,
      password,
      backupCodes,
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post(url, body, { headers });
  }

  loginUser(email: string, password: string): Observable<any> {
    const url = 'http://localhost:3000/login/api';
    const body = {
      email,
      password,
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post(url, body, { headers });
  }

  checkCode(backupCode: number, email: string): Observable<any> {
    const url = 'http://localhost:3000/backupcode/api';
    const body = {
      backupCode,
      email,
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post(url, body, { headers });
  }
}
