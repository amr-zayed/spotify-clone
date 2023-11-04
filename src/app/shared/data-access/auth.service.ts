import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subscription, defer, interval, map, of } from 'rxjs';
import { environment } from './../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscription!: Subscription;
  constructor(private http: HttpClient, private route: ActivatedRoute, ) { }
  
  getToken(): string | null{
    return localStorage.getItem( 'token' );
  }
  
  generateToken(){
    const access_token = this.getHashParams();
    if (access_token){
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


// authBaseUrl: string = "https://accounts.spotify.com";

// private generateRandomString(length: number): string{
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const values = crypto.getRandomValues(new Uint8Array(length));
//   return values.reduce((acc, x) => acc + possible[x % possible.length], "");
// }

// private  sha256(plain: string): Observable<ArrayBuffer>{
//   const encoder = new TextEncoder()
//   const data = encoder.encode(plain)
//   return defer(()=>window.crypto.subtle.digest('SHA-256', data))
// }

// private base64encode(input: ArrayBuffer){
//   return btoa(String.fromCharCode(...new Uint8Array(input)))
//     .replace(/=/g, '')
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_');
// }

// generateToken(): Observable<any>{
//   const codeVerifier = localStorage.getItem('code_verifier') as string;
//   const code = this.route.snapshot.paramMap.get('code') as string;
//   let headers = new HttpHeaders();
//   headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')
//   const body = new URLSearchParams({
//     client_id: environment.clientId,
//     grant_type: 'authorization_code',
//     code,
//     redirect_uri: environment.frontUrl,
//     code_verifier: codeVerifier,
//   })
//   console.log(headers)
//   console.log(body)
//   return this.http.post(`${this.authBaseUrl}/api/token`, body, {headers})
// }

// redirectToAuthFlow(){
  //   const codeVerifier = this.generateRandomString(64);
  //   return this.sha256(codeVerifier).pipe(map(hash=>{
    //     const codeChallenge = this.base64encode(hash);

//     const scope = "user-read-private user-read-playback-state streaming user-modify-playback-state playlist-modify-public user-library-modify user-top-read user-read-currently-playing playlist-read-private user-follow-read user-read-recently-played playlist-modify-private user-follow-modify user-library-read user-read-email";

//     // generated in the previous step
//     localStorage.setItem('code_verifier', codeVerifier);

//     const params =  {
//       response_type: 'code',
//       client_id: environment.clientId,
//       scope,
//       code_challenge_method: 'S256',
//       code_challenge: codeChallenge,
//       redirect_uri: environment.frontUrl,
//     }

//     let search = new URLSearchParams(params).toString();
//     document.location = this.authBaseUrl + '/authorize/?' + search;
//   }))
// }