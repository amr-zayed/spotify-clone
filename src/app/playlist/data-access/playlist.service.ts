import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { HttpClient } from '@angular/common/http';
import { Playlist } from 'src/app/shared/utils/dataTypes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getPlaylistById(id: string): Observable<Playlist> {
    const getPlaylistUrl = `${environment.apiUrl}playlists/${id}`;
  
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)

    return this.http.get<Playlist>(getPlaylistUrl,{headers})
  }
}
