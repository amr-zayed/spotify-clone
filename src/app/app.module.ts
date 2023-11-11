import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './root/features/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './root/features/player/player.component';
import { LibraryService } from './root/data-access/library.service';
import { LibItemComponent } from './root/ui/lib-item/lib-item.component';
import { SvgComponent } from './shared/features/svg/svg.component';
import { PlaylistComponent } from './playlist/features/playlist.component';
import { TracksComponent } from './shared/features/tracks/tracks.component';
import { TrackComponent } from './track/track/track.component';
import { ArtistComponent } from './artist/artist/artist.component';
import { AlbumComponent } from './album/album/album.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SearchComponent,
    PlayerComponent,
    LibItemComponent,
    SvgComponent,
    PlaylistComponent,
    TracksComponent,
    TrackComponent,
    ArtistComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressBarModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
