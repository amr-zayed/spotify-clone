/// <reference types="@types/spotify-web-playback-sdk"/>
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Observable, catchError, defer, map, of, tap } from 'rxjs';
import { ObjType, SimplifiedTrack, Track } from 'src/app/shared/utils/dataTypes';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  spotifyPlayer: Spotify.Player | null = null;
  private deviceId: string = '';
  track: Track | null = null;
  isPlaying: boolean = false;

  constructor( private http: HttpClient, private auth: AuthService ) { }

  initPlayer() {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.type = 'text/javascript'
    script.addEventListener('load', _ => {})
    document.head.appendChild(script)
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log(
        'The Web Playback SDK is ready. We have access to Spotify.Player'
      )
      const accessToken = this.auth.getToken() as string;
      this.spotifyPlayer = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
          cb(accessToken)
        },
        volume: 0.5
      })

      this.spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        this.deviceId = device_id;
      })

      
      this.spotifyPlayer.connect();
    }
  }
  getPlayerState() {
    this.spotifyPlayer?.getCurrentState().then(state => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
      }
      else{
        var current_track = state.track_window.current_track;
        var next_track = state.track_window.next_tracks[0];
        console.log('Currently Playing', current_track);
        console.log('Playing Next', next_track);
      }    
    });    
  }
  
  getCurrentSong() {
    const currentSongUrl = `${environment.apiUrl}me/player/currently-playing`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    
    return this.http.get(currentSongUrl,{headers})
    .pipe(
      tap(_ => console.log('fetched currently playing song')),
      catchError(this.handleError('getPlaylists',[]))
      );
  }
  pausePlayback(): Observable<void> {
    return defer(()=>this.spotifyPlayer!.pause()).pipe(
      map(_=>{this.isPlaying=false}))
  }
  startPlayback(): Observable<void> {
    return defer(()=>this.spotifyPlayer!.resume()).pipe(
      map(_=>{this.isPlaying=true}))
  }
  playTrack(track: Track, positionMs: number) {
    this.track = track;
    const playbackStateUrl = `${environment.apiUrl}me/player/play?device_id=${this.deviceId}`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    headers = headers.set('Content-Type', 'application/json')
    let body = {'position_ms': positionMs, 'uris': [this.track.uri]}
    
    return this.http.put(playbackStateUrl, body, {headers}).pipe(
      map(_=>{this.isPlaying=true})
    )
  }
  playMultiple(track: Track, positionMs: number, listUri: string, position: number) {
    this.track = track;
    const playbackStateUrl = `${environment.apiUrl}me/player/play?device_id=${this.deviceId}`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    headers = headers.set('Content-Type', 'application/json')
    let body = {'context_uri': listUri, offset: {"position": position},'position_ms': positionMs}
    
    return this.http.put(playbackStateUrl, body, {headers})
  }
  // skipToNextPlayback() {}
  // skipToPreviousPlayback() {}
  // seekToPosition() {}
  // setRepeatMode() {}
  // setVolume() {}
  // toggleShuffle() {}
  getQueue() {
    const queueUrl = `${environment.apiUrl}me/player/queue`;
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    
    return this.http.get(queueUrl,{headers})
    .pipe(
      tap(_ => console.log('fetched currently playing song')),
      catchError(this.handleError('getPlaylists',[]))
    );
  }
  addToQueue() {}
  
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
  
  // transferToWeb(deviceId: string) {
  //   const transferPlayerUrl = `${environment.apiUrl}me/player`;
  
  //   let headers = new HttpHeaders()
  //   headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
  //   headers = headers.set('Content-Type', 'application/json')
  //   let body = {'device_ids': [deviceId], 'play': true}
  
  //   return this.http.put(transferPlayerUrl,body, {headers})
  // }
  
  
  // getAvailableDevices() {
  //   const transferPlayerUrl = `${environment.apiUrl}me/player/devices`;
  
  //   let headers = new HttpHeaders()
  //   headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
  
  //   return this.http.get(transferPlayerUrl, {headers})
  // }
  
  
  // getRecentSongs() {
  //   const currentSongUrl = `${environment.apiUrl}me/player/recently-played/limit=1`;
  
  //   let headers = new HttpHeaders()
  //   headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
  
  //   return this.http.get(currentSongUrl,{headers})
  //   .pipe(
  //     tap(_ => console.log('fetched Recently Played songs')),
  //     catchError(this.handleError('getPlaylists',[]))
  //     );
  //   }

  // this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
  //   console.log('Device ID has gone offline', device_id)
  // })

  // this.spotifyPlayer.addListener('initialization_error', ({ message }) => {
  //   console.error(message)
  // })

  // this.spotifyPlayer.addListener('authentication_error', ({ message }) => {
  //   console.error(message)
  // })

  // this.spotifyPlayer.addListener('account_error', ({ message }) => {
  //   console.error(message)
  // })