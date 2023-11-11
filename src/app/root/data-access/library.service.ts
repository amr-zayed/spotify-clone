import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Album, Artist, ArtistsResp, Playlist, Podcast } from '../../shared/utils/dataTypes';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { environment } from 'src/environments/environment.development';
import { AlbumsResp, PlaylistsResp, PodcastsResp } from 'src/app/shared/utils/responsesDataTypes';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private playlistsUrl = `${environment.apiUrl}me/playlists`;  // URL to web api
  private artistsUrl = `${environment.apiUrl}me/following?type=artist`;  // URL to web api
  private albumsUrl = `${environment.apiUrl}me/albums`;  // URL to web api
  private podcastsUrl = `${environment.apiUrl}me/shows`;  // URL to web api

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAlbums(): Observable<Album[]>{
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    return this.http.get<AlbumsResp>(this.albumsUrl, {headers})
    .pipe(
      map(resp=>resp.items),
      catchError(this.handleError<Album[]>('getAlbums',[]))
      );
    }
    
    getArtists(): Observable<Artist[]>{
      let headers = new HttpHeaders()
      headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
      return this.http.get<ArtistsResp>(this.artistsUrl, { headers })
      .pipe(
        map( resp => resp.artists.items),
        catchError(this.handleError<Artist[]>('getArtists',[]))
        );
      }
      
      getPlaylists(): Observable<Playlist[]> {
        let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    return this.http.get<PlaylistsResp>(this.playlistsUrl, {headers})
    .pipe(
      map(resp => resp.items),
      catchError(this.handleError('getPlaylists',[]))
      );
  }
  
  getPodcasts(): Observable<Podcast[]>{
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    return this.http.get<PodcastsResp>(this.podcastsUrl, {headers})
    .pipe(
      map(resp => resp.items),
      catchError(this.handleError<Podcast[]>('getPodcasts',[]))
      );
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
