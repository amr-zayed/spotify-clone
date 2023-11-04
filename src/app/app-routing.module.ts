import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PlaylistComponent } from './playlist/features/playlist.component';
import { TrackComponent } from './track/track/track.component';
import { AlbumComponent } from './album/album/album.component';
import { ArtistComponent } from './artist/artist/artist.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'playlist/:id', component: PlaylistComponent},
  {path: 'track/:id', component: TrackComponent},
  {path: 'album/:id', component: AlbumComponent},
  {path: 'artist/:id', component: ArtistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
