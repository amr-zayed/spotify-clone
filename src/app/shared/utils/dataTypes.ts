export interface AlbumsResp {
    href: string,
    limit: number,
    next: number,
    offset: number,
    previous: number,
    total: number,
    items: Album[]
}
export interface Album {
    added_at: string,
    album:{
        album_type: string,
        total_tracks: number,
        available_markets: string[],
        external_urls: {
            spotify: string,
        },
        href: string,
        id: string,
        images: image[]
        name: string,
        release_date: string,
        release_date_precision: string,
        restrictions: {
            reason: string,
        },
        type: string,
        uri: string,
        artists: Artist[],
        tracks: {
            href: string,
            limit: number,
            next: string,
            offset: number,
            previous: string,
            total: number,
        }
    }
}

export interface Artist {
    id: number;
    genres: string[],
    followers: {
        href: string,
        total: number,
    }
    href: string,
    name: string;
    images: image[],
    popularity: number,
    type: Artist,
    uri: string
}
export interface ArtistsResp {
    artists: {
    href: string,
    limit: number,
    next: string,
    total: number,
    items: Artist[]
    }
}

export interface Playlist {
    id: string
    collaborative: boolean;
    description: string;
    images: image[],
    name: string,
    public: boolean,
    tracks: {
        total: number,
    }
}
export interface PlaylistsResp {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: number,
    total: number,
    items: Playlist[],
}

export interface Podcast {
    added_at: string,
    show:{
        available_markets: string[],
        copyrights: [{
            text: string,
            type: string
        }],
        description: string,
        html_description: string,
        explicit: boolean,
        external_urls: {
          spotify: string
        },
        href: string,
        id: string,
        images: image[],
        is_externally_hosted: boolean,
        languages: string[],
        media_type: string,
        name: string,
        publisher: string,
        type: string,
        uri: string,
        total_episodes: number
    }
}
export interface PodcastsResp {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: number,
    total: number,
    items: Podcast[]
}

export interface image {
    url:string,
    height: number,
    width: number,
}

export enum Repeat {
    on,
    off,
    one
}