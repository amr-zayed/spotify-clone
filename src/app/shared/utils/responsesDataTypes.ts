import { Album, Playlist, Podcast, Track } from "./dataTypes"

export interface PlaylistsResp {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: number,
    total: number,
    items: Playlist[],
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

export interface AlbumsResp {
    href: string,
    limit: number,
    next: number,
    offset: number,
    previous: number,
    total: number,
    items: Album[]
}

export interface currenSongResp {
    device: {
        id: string,
        is_active: boolean,
        is_private_session: boolean,
        is_restricted: boolean,
        name: string,
        type: string,
        volume_percent: number,
        supports_volume: boolean
      },
      repeat_state: string,
      shuffle_state: boolean,
      context: {
        type: string,
        href: string,
        external_urls: {
          spotify: string
        },
        uri: string
      },
      timestamp: number,
      progress_ms: number,
      is_playing: boolean,
      item: Spotify.Track,
}