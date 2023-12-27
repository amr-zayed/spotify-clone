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
export interface Artists{
    href: string,
    limit: number,
    next: string,
    total: number,
    items: Artist[]
}
export interface ArtistsResp {
    artists: Artists 
}

export interface Playlist {
    id: string
    collaborative: boolean;
    description: string | HTMLDivElement;
    images: image[],
    name: string,
    public: boolean,
    tracks: {
        href: string,
        limit: number,
        next: number,
        offset: number,
        previous: number,
        total: number,
        items: PlaylistTrack[],
    },
    owner: {
        display_name: string,
        external_urls: {spotify: string}
        href: string
        id: string
        type: string
        uri: string
    },
    uri: string
}

export interface Podcast {
    added_at: string,
    show:{
        available_markets: string[],
        copyrights: {
            text: string,
            type: string
        }[],
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

export interface image {
    url:string,
    height: number,
    width: number,
}




export interface SimplifiedTrack {
    artists: [
    {
        external_urls: {
        spotify: string
        },
        href: string,
        id: string,
        name: string,
        type: string,
        uri: string
    }],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    is_playable: boolean,
    linked_from: {
        external_urls: {
        spotify: string
        },
        href: string,
        id: string,
        type: string,
        uri: string
    },
    restrictions: {
        reason: string
    },
    name: string,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string,
    is_local: boolean
}
export interface PlaylistTrack {
    added_at: string,
    added_by: {
        external_urls: {
            href: string,
            id: string,
            type: string,
            uri: string
        }, 
        href: string, 
        id: string, 
        type: string,
        uri: string
    }
    is_local: false,
    track: Spotify.Track
}
export interface Track {
    album: {
        album_type: string,
        total_tracks: number,
        available_markets: string[],
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        images: {
            url: string,
            height: number,
            width: number
        }[],
        name: string,
        release_date: string,
        release_date_precision: string,
        restrictions: {
            reason: string
        },
        type: string,
        uri: string,
        artists: [
            {
            external_urls: {
                spotify: string
            },
            href: string,
            id: string,
            name: string,
            type: string,
            uri: string
            }
        ]
    },
    artists: 
    {
        external_urls: {
        spotify: string
        },
        followers: {
            href: string,
            total: number
        },
        genres:string[],
        href: string,
        id: string,
        images: image[]
        name: string,
        popularity: number,
        type: string,
        uri: string
    }[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    is_playable: boolean,
    linked_from: {
        external_urls: {
        spotify: string
        },
        href: string,
        id: string,
        type: string,
        uri: string
    },
    restrictions: {
        reason: string
    },
    name: string,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string,
    is_local: boolean
}

export interface User{
    country: string,
    display_name: string,
    email: string,
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: {
        spotify: string
    },
    followers: {
        href: string,
        total: number
    },
    href: string,
    id: string,
    images: [
        {
        url: string,
        height: number,
        width: number
        }
    ],
    product: string,
    type: string,
    uri: string
}

export enum Repeat {
    'context',
    'off',
    'track'
}
export enum ObjType {
    playlist,
    track,
    album
}