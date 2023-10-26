import { ChangeDetectorRef, Component } from '@angular/core';
import { LibraryService } from '../../data-access/library.service';
import { Album, Artist, Playlist, Podcast } from 'src/app/shared/utils/dataTypes';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  categories: string[] = ['Playlists', 'Artists', 'Albums', 'Podcasts & Shows']
  libraryItems: any[] = []; 
  currentCategory: string = ''; 
  LibraryOpened: boolean = true;

  constructor(private libraryService: LibraryService, private cd: ChangeDetectorRef) { }
  
  ngOnInit(): void{
    this.changeCategory('Playlists');
  }

  ngAfterViewInit(){
    this.cd.detectChanges();
  }

  changeCategory(category: string): void {
    if (category=='Albums'){
      this.libraryService.getAlbums().subscribe((albums)=> {
        this.libraryItems=albums;
        this.currentCategory = category;
      })
    }
    else if (category=='Artists'){
      this.libraryService.getArtists().subscribe((artists)=> {
        this.libraryItems=artists;
        this.currentCategory = category;
      })
    }
    else if (category=='Playlists'){
      this.libraryService.getPlaylists().subscribe((resp)=> {
        this.libraryItems=resp;
        this.currentCategory = category;
      })
    }
    else if (category=='Podcasts & Shows'){
      this.libraryService.getPodcasts().subscribe((podcasts)=> {
        this.libraryItems=podcasts;
        this.currentCategory = category;
      })
    }
  }

  toggleLib(): void{
    this.LibraryOpened = !this.LibraryOpened;
    this.cd.detectChanges();
  }
}
