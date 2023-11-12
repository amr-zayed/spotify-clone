import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Playlist } from 'src/app/shared/utils/dataTypes';
import { PlaylistsResp } from 'src/app/shared/utils/responsesDataTypes';
import { environment } from 'src/environments/environment.development';

interface playlistItems{
  message: string,
  playlists: PlaylistsResp
};
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUserPlaylists(): Observable<Playlist[]> {
    const browseCategoriesUrl = `${environment.apiUrl}me/playlists`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    
    return this.http.get<PlaylistsResp>(browseCategoriesUrl,{headers})
    .pipe(
      map(resp => resp.items),
      catchError(this.handleError('getUserPlaylists',[])));
  }
  
  getUserFeaturedPlaylists(): Observable<playlistItems | null> {
    const browseCategoriesUrl = `${environment.apiUrl}browse/featured-playlists`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    
    return this.http.get<playlistItems>(browseCategoriesUrl,{headers})
    .pipe(
      catchError(this.handleError('getUserFeaturedPlaylists',null)));
  }
  getPlaylistsByCategory(type: 'artists' | 'tracks'): Observable<playlistItems | null> {
    const browseCategoriesUrl = `${environment.apiUrl}me/top/${type}`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    
    return this.http.get<playlistItems>(browseCategoriesUrl,{headers})
    .pipe(
      catchError(this.handleError('getUserFeaturedPlaylists',null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
