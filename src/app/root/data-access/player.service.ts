/// <reference types="@types/spotify-web-playback-sdk"/>
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Observable, catchError, defer, map, of, tap } from 'rxjs';
import { ObjType, Playlist, PlaylistTrack, Repeat, SimplifiedTrack, Track } from 'src/app/shared/utils/dataTypes';
import { currenSongResp } from 'src/app/shared/utils/responsesDataTypes';
import { TimerService } from './../../shared/data-access/timer.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  spotifyPlayer: Spotify.Player | null = null;
  deviceId: string = '';
  track: Spotify.Track | null = null;
  isPlaying: boolean = false;
  isFavourite: boolean = false;
  shuffleEnabled: boolean = false;
  repeatMode: 'CONTEXT' | 'TRACK' | 'OFF' = 'OFF';
  tracksUri: string | null = null;

  timerCounter: number = 0;

  constructor( private http: HttpClient, private auth: AuthService, private zone: NgZone, private timerServices: TimerService ) { }

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

      this.spotifyPlayer.addListener('player_state_changed', (state) => {
        this.zone.run(()=>{
          if (state.paused) {
            this.timerServices.pauseTimer()
            this.isPlaying = false;
          }else{
            this.timerServices.ms = state.position;
            this.timerServices.maxSeconds = state.duration;
            this.timerServices.startTimer();
            this.isPlaying = true;
          }
          this.track = state.track_window.current_track;
          this.tracksUri = state.context.uri;
          this.checkIfFavorite([this.track.id as string]).subscribe(resp=>this.isFavourite = resp[0])
          this.shuffleEnabled = state.shuffle
          this.repeatMode = state.context.metadata!.options.repeat_mode as 'CONTEXT' | 'TRACK' | 'OFF';
        })

      })

      this.spotifyPlayer.connect();
    }
  }

  pausePlayback(): Observable<unknown> {
    return defer(()=>this.spotifyPlayer!.pause()).pipe(
      map(_=>{this.isPlaying=false}),
      catchError(this.handleError('pausePlayback')))
  }
  startPlayback(): Observable<unknown> {
    return defer(()=>this.spotifyPlayer!.resume()).pipe(
      map(_=>{this.isPlaying=true}),
      catchError(this.handleError('startPlayback')))
  }
  playNextTrack(): Observable<unknown> {
    return defer(()=>this.spotifyPlayer!.nextTrack()).pipe(
      catchError(this.handleError('playNextTrack')))
  }
  playPreviousTrack(): Observable<unknown> {
    return defer(()=>this.spotifyPlayer!.previousTrack()).pipe(
      catchError(this.handleError('playPreviousTrack')))
  }
  seekTo(time: number){
    return defer(()=>this.spotifyPlayer!.seek(time)).pipe(
      tap(_=> this.startPlayback().subscribe()),
      catchError(this.handleError('playPreviousTrack')))
  }
  playTrack(track: Spotify.Track, positionMs: number): Observable<unknown> {
    const playbackStateUrl = `${environment.apiUrl}me/player/play?device_id=${this.deviceId}`;

    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    headers = headers.set('Content-Type', 'application/json')

    let body = {'position_ms': positionMs, 'uris': [track.uri]}

    return this.http.put(playbackStateUrl, body, {headers}).pipe(
      map(_=>{this.isPlaying=true}),
      catchError(this.handleError('playTrack'))
    )
  }

  playMultiple(track: Spotify.Track, positionMs: number, listUri: string, location: number): Observable<unknown> {
    const playbackStateUrl = `${environment.apiUrl}me/player/play?device_id=${this.deviceId}`;

    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    headers = headers.set('Content-Type', 'application/json')

    let body = {'context_uri': listUri, offset: {"position": location},'position_ms': positionMs}

    return this.http.put(playbackStateUrl, body, {headers}).pipe(
      map(_=>this.isPlaying=true),
      catchError(this.handleError('playTracks')))
  }

  removeTrackFromFavorite(): Observable<unknown>{
    const removeTrackToFavUrl = `${environment.apiUrl}me/tracks?ids=${this.track?.id}`;

    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    headers = headers.set('Content-Type', 'application/json')

    let body = {'ids': [this.track?.id]}

    return this.http.delete(removeTrackToFavUrl, {headers, body})
    .pipe(
      map(_=>this.isFavourite=false),
      catchError(this.handleError('checkIfFavorite',false)));
  }
  addTrackToFavorite(): Observable<unknown>{
    const addTrackToFavUrl = `${environment.apiUrl}me/tracks?ids=${this.track?.id}`;

    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
    headers = headers.set('Content-Type', 'application/json')

    let body = {'ids': [this.track?.id]}

    return this.http.put(addTrackToFavUrl, body, {headers})
    .pipe(
      map(_=>this.isFavourite=true),
      catchError(this.handleError('checkIfFavorite',[]))
    );
  }
  checkIfFavorite(ids: string[]): Observable<boolean[]> {
    let idsToString = ''
    ids.forEach(id=>idsToString += id + ',');
    idsToString = idsToString.substring(0, idsToString.length-1)
    const checkFavUrl = `${environment.apiUrl}me/tracks/contains?ids=${idsToString}`;

    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)

    return this.http.get<boolean[]>(checkFavUrl, {headers})
    .pipe(
      catchError(this.handleError('checkIfFavorite',[]))
    );
  }
  toggleShuffle(): Observable<unknown>{
    const toggleShuffleUrl = `${environment.apiUrl}me/player/shuffle?state=${!this.shuffleEnabled}&device_id=${this.deviceId}`;

    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)


    return this.http.put(toggleShuffleUrl, {}, {headers})
    .pipe(
      map(_=>this.shuffleEnabled = !this.shuffleEnabled),
      catchError(this.handleError('checkIfFavorite'))
    );
  }
  setRepeatMode(mode: 'context' | 'track' | 'off'): Observable<unknown>{
    const repeatModeUrl = `${environment.apiUrl}me/player/repeat?state=${mode}&device_id=${this.deviceId}`;

    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)

    console.log(mode)
    return this.http.put(repeatModeUrl, {}, {headers})
    .pipe(
      catchError(this.handleError('checkIfFavorite',[]))
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


  // addToQueue() {}
  // skipToNextPlayback() {}
  // skipToPreviousPlayback() {}
  // seekToPosition() {}
  // setRepeatMode() {}
  // setVolume() {}
  // toggleShuffle() {}

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

  // getCurrentSong(): Observable<Spotify.Track | null> {
  //   const currentSongUrl = `${environment.apiUrl}me/player/currently-playing`;

  //   let headers = new HttpHeaders()
  //   headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)

  //   return this.http.get<currenSongResp>(currentSongUrl,{headers})
  //   .pipe(
  //     map(track=>track.item),
  //     catchError(this.handleError('getPlaylists',null))
  //     );
  // }

  // getQueue() {
  //   const queueUrl = `${environment.apiUrl}me/player/queue`;

  //   let headers = new HttpHeaders()
  //   headers = headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
  //   return this.http.get(queueUrl,{headers})
  //   .pipe(
  //     catchError(this.handleError('getPlaylists',[]))
  //   );
  // }