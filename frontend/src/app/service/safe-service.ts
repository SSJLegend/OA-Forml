import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeRequest, CodeResponse } from '../types';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})
export class SafeService {
  private apiUrl='http://localhost:5000/api/crack_safe'
  constructor(private http: HttpClient) { }

  //GET
  getAttemptHistory():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  //POST
  crackSafe(request: CodeRequest):Observable<CodeResponse>{
    return this.http.post<CodeResponse>(this.apiUrl, request);
  }

  //DELETE
  resetLock():Observable<any>{
    return this.http.delete('http://localhost:5000/api/reset')
  }


}


