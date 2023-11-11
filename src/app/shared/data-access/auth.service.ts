import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from './../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { User } from '../utils/dataTypes';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  
  initAuth(): void{
    const token = this.getToken();
    if (token) {
      this.getUserInfo(token).subscribe(user=> {
        if (user){
          console.log('token valid')
          this.user=user
        }else{
          console.log('token invalid...refreshing token')
          this.refreshToken().subscribe((resp:any)=>localStorage.setItem('token', resp.access_token))
        }
      })
    }else {
      console.log('no token found')
      this.generateToken();
      this.getUserInfo(this.getToken() as string).subscribe(user=>this.user=user)
    }

  }

  getUserInfo(token: string): Observable<User | null> {
    const userInfoUrl = `${environment.apiUrl}me`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)
    
    return this.http.get<User>(userInfoUrl,{headers})
    .pipe(
      catchError(this.handleError('getUserInfo',null)));
  };

  getToken(): string | null{
    return localStorage.getItem( 'token' );
  };
  
  generateToken(){
    const access_token = this.getHashParams();
    if (access_token){
      localStorage.setItem('token', access_token);
    }
  };

  private refreshToken(){
    const refreshTokenUrl = `${environment.authUrl}/refresh_token	`

    return this.http.get(refreshTokenUrl, {withCredentials: true})
    .pipe(
      catchError(this.handleError('getting refresh token',null)));
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
  };
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    
    }
  };

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