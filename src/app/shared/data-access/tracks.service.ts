import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  checkFavoritePlaylists(playlistId: string, usersIds: string[]): Observable<boolean[]> {
    let idsToString = ''
    usersIds.forEach(id=>idsToString += id + ',');
    idsToString = idsToString.substring(0, idsToString.length-1)
    const checkFavoriteUrl = `${environment.apiUrl}playlists/${playlistId}/followers/contains?ids=${idsToString}`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    
    return this.http.get<boolean[]>(checkFavoriteUrl,{headers})
    .pipe(
      catchError(this.handleError('getPlaylists',[false])));
  }
  
  followPlaylists(playlistId: string): Observable<null> {
    const followPlaylistUrl = `${environment.apiUrl}playlists/${playlistId}/followers`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    headers = headers.set('Content-Type', 'application/json')
    
    return this.http.put<null>(followPlaylistUrl,{public:false}, {headers})
    .pipe(
      catchError(this.handleError('getPlaylists',null)));
  }

  unfollowPlaylists(playlistId: string): Observable<null> {
    const followPlaylistUrl = `${environment.apiUrl}playlists/${playlistId}/followers`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    
    return this.http.delete<null>(followPlaylistUrl,{headers})
    .pipe(
      catchError(this.handleError('getPlaylists',null)));
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
