import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { environment } from './../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  // // STORE the token in localstore:
  // setToken(token:string){

  //   // First, serialize it (but just if token is not string type).
  //   const tokenString:string = JSON.stringify( token );

  //   localStorage.setItem('token', tokenString);
  // }

  // READ the token from localstorage and Deserialize
  getToken(): string | null{
    return localStorage.getItem( 'token' );
  }

  generateToken(): void{
    console.log('generating token')
    const access_token = this.getHashParams();
    console.log(access_token)
    if (access_token){
      console.log('setting token')
      localStorage.setItem('token', access_token);
    }
  }

  private getHashParams(): string {
    var hashParams = {
      "refresh_token": '',
      "access_token": '',
    };
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      if(e[1] == "access_token"){
        return decodeURIComponent(e[2]);
      }
    }
    return '';
  }
}