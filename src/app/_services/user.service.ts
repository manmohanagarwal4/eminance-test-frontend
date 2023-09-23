import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = new BehaviorSubject(false);
  private user = new BehaviorSubject(<any>null);

  constructor(private http: HttpClient) { }

  // output to Auth Guard and Other Component
  getAuth(): Observable<boolean> {
    return this.auth.asObservable();
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  // If login is true
  updateUserAuth(authState: boolean, user: any) {
    this.auth.next(authState);
    this.user.next(user);
  }

  register(data: any) {
    const url = `http://localhost:3000/api/user/register`;
    return this.http.post(url, data);
  }

  login(data: any) {
    const url = `http://localhost:3000/api/user/login`;
    return this.http.post(url, data);
  }

  logout() {
    const url = `http://localhost:3000/api/user/logout`;
    return this.http.put(url, {});
  }

  getProductList() {
    const url = 'http://localhost:3000/api/user/product-list';
    return this.http.get(url);
  }

}
