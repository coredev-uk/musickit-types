/// <reference path="MusicKit.Player.d.ts" />

declare namespace MusicKit {
  /**
   * An object that represents a unique identifier for a music item.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/musickit/musicitemid)
   */
  type MusicItemID = string;

  /**
   * The rating of the content that potentially plays while playing a resource.
   * A nil value means no rating is available for this resource.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/musickit/contentrating)
   */
  type ContentRating = "clean" | "explicit";

  /**
   * Base interface for all Apple Music API resources.
   */
  interface BaseResource {
    id: string;
    type: string;
    href: string;
    attributes: Record<string, any>;
    relationships?: Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
    meta?: Record<string, any>;
    views?: Record<string, View<Resource> | Relationship<Resource>>;
  }

  /**
   * Base interface for media-type resources with common attributes.
   */
  interface BaseMediaResource extends BaseResource {
    attributes: {
      name: string;
      artistName: string;
      artwork: Artwork;
      genreNames: string[];
      contentRating?: ContentRating;
      url: string;
      personalRating?: number;
      inLibrary?: boolean;
      inFavorites?: boolean;
    };
  }

  /**
   * Base interface for library resources with additional library-specific attributes.
   */
  interface BaseLibraryResource extends BaseResource {
    attributes: {
      dateAdded?: string;
      personalRating?: number;
      inFavorites?: boolean;
    };
  }

  /**
   * The resource map for all resources from the Apple Music API with their respective types.
   */
  interface ResourceMap {
    songs?: MusicKit.Songs;
    albums?: MusicKit.Albums;
    artists?: MusicKit.Artists;
    playlists?: MusicKit.Playlists;
    storefronts?: MusicKit.Storefronts;
    "library-playlist-folders"?: MusicKit.LibraryPlaylists;
    "library-playlists"?: MusicKit.LibraryPlaylists;
    "library-songs"?: MusicKit.LibrarySongs;
    "library-albums"?: MusicKit.LibraryAlbums;
    "library-artists"?: MusicKit.Artists;
    curator?: MusicKit.Curators;
    "social-profiles"?: MusicKit.SocialProfile;
    "apple-curators"?: MusicKit.AppleCurators;
    "credit-artists"?: MusicKit.CreditArtist;
    lyrics?: MusicKit.Lyrics;
    credits?: MusicKit.Credit;
    catalog?: Relationship<Playlists>;
    "personal-recommendation": MusicKit.PersonalRecommendation;
    stations: MusicKit.Stations;
    "music-summaries": MusicKit.ReplaySummary;
    "music-summaries-milestones": MusicKit.ReplayMilestone;
    "editorial-items": MusicKit.EditorialItem;
  }

  /**
   * A map of all resources assigned to relationships returned from the Apple Music API.
   */
  type Relationships = {
    [K in keyof MusicKit.ResourceMap]?: Relationship<MusicKit.ResourceMap[K]>;
  };

  /**
   * A to-one or to-many relationship from one resource object to others.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/relationship)
   */
  interface Relationship<Data> {
    href?: string;
    next?: string;
    data: Data[];
    meta?: Record<string, any>;
  }

  /**
   * A to-one or to-many relationship view from one resource object to others representing interesting associations.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/view)
   */
  interface View<Data> {
    href?: string;
    next?: string;
    attributes: {
      title: string;
    };
    data: Data[];
    meta?: Record<string, any>;
  }

  /**
   * A resource—such as an album, song, or playlist.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/resource)
   */
  interface Resource extends BaseResource {}

  /**
   * A resource object that represents a storefront, an Apple Music and iTunes Store territory that the content is available in.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/storefronts)
   */
  interface Storefronts extends Resource {
    type: "storefronts";
    attributes: {
      defaultLanguageTag: string;
      explicitContentPolicy: "allowed" | "opt-in" | "prohibited";
      name: string;
      supportedLanguageTags: string[];
    };
  }

  /**
   * A resource object that represents a music genre.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/genres)
   */
  interface Genres extends Resource {
    type: "genres";
    attributes: {
      name: string;
      parentId?: string;
      parentName?: string;
    };
  }

  /**
   * A resource object that represents a song.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/songs-um8)
   */
  interface Songs extends Resource {
    id: MusicItemID;
    type: "songs";
    attributes: {
      albumName: string;
      artistName: string;
      artwork: Artwork;
      attribution?: string;
      composerName?: string;
      contentRating?: ContentRating;
      discNumber?: number;
      durationInMillis: number;
      editorialNotes?: EditorialNotes;
      genreNames: string[];
      hasLyrics: boolean;
      isrc?: string;
      movementCount?: number;
      movementName?: string;
      movementNumber?: number;
      name: string;
      playParams?: PlayParameters;
      previews: Preview[];
      releaseDate?: string;
      trackNumber?: number;
      url: string;
      workName?: string;
      artistUrl?: string;
      personalRating?: number;
      inLibrary?: boolean;
      inFavorites?: boolean;
      audioLocale?: string;
    };
    relationships?: {
      albums?: Relationship<Albums>;
      artists?: Relationship<Artists>;
      genres?: Relationship<Genres>;
      station?: Relationship<Stations>;
      composers?: Relationship<Artists>;
      library?: Relationship<LibraryAlbums>;
      "music-videos"?: Relationship<MusicVideos>;
      "audio-analysis"?: Relationship<AudioAnalysis>;
    };
  }

  /**
   * A resource object that represents a music video.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/musicvideos/)
   */
  interface MusicVideos extends Resource {
    id: MusicItemID;
    type: "music-videos";
    attributes: {
      albumName?: string;
      artistName: string;
      artwork: Artwork;
      contentRating?: ContentRating;
      durationInMillis: number;
      editorialNotes?: EditorialNotes;
      genreNames: string[];
      has4K: boolean;
      hasHDR: boolean;
      isrc?: string;
      name: string;
      playParams?: PlayParameters;
      previews: Preview[];
      releaseDate?: string;
      trackNumber?: number;
      url: string;
      videoSubType?: "preview";
      workId?: string;
      workName?: string;
      artistUrl?: string;
      personalRating?: number;
      inLibrary?: boolean;
      inFavorites?: boolean;
    };
    relationships?: {
      albums: Relationship<Albums>;
      genres: Relationship<Genres>;
      library: Relationship<LibraryAlbums>;
      songs: Relationship<Songs>;
    } & Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
    views: {
      "more-by-artist": View<MusicVideos>;
      "more-in-genre": View<MusicVideos>;
    };
  }

  /**
   * A resource object that represents an Apple curator.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/applecurators/)
   */
  interface AppleCurators extends Resource {
    type: "apple-curators";
    attributes: {
      artwork: Artwork;
      editorialNotes?: EditorialNotes;
      kind: "Curator" | "Genre" | "Show";
      name: string;
      shortName?: string;
      showHostName?: string;
      url: string;
    };
    relationships?: {
      playlists: Relationship<Playlists>;
    } & Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
  }

  /**
   * A resource object that represents a curator.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/curators-uja)
   */
  interface Curators extends Resource {
    type: "curator";
    attributes: {
      artwork: Artwork;
      editorialNotes?: EditorialNotes;
      name: string;
      url: string;
    };
    relationships: {
      playlists: Relationship<Playlists>;
    };
  }

  /**
   * A resource object that represents a station.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/stations/)
   */
  interface Stations extends Resource {
    type: "stations";
    attributes: {
      artwork: Artwork;
      durationInMillis: number;
      editorialNotes: EditorialNotes;
      episodeNumber: number;
      contentRating?: ContentRating;
      isLive: boolean;
      name: string;
      playParams: PlayParameters;
      stationProviderName: string;
      url: string;
      personalRating?: number;
      inLibrary?: boolean;
      inFavorites?: boolean;
    };
  }

  /**
   * A resource object that represents a record label.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/recordlabels/)
   */
  interface RecordLabels extends Resource {
    id: MusicItemID;
    type: "record-labels";
    attributes: {
      artwork: Artwork;
      description: DescriptionAttribute;
      name: string;
      url: string;
    };
    views: {
      "latest-releases": View<Albums>;
      "top-releases": View<Albums>;
    };
  }

  /**
   * A resource object that represents an album.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/albums-uib)
   */
  interface Albums extends Resource {
    type: "albums";
    attributes: {
      artistName: string;
      artistUrl?: string;
      artwork: Artwork;
      contentRating?: ContentRating;
      copyright?: string;
      editorialNotes?: EditorialNotes;
      genreNames: string[];
      isCompilation: boolean;
      isPrerelease: boolean;
      isComplete: boolean;
      isMasteredForItunes: boolean;
      isSingle: boolean;
      name: string;
      playParams?: PlayParameters;
      recordLabel?: string;
      releaseDate?: string;
      trackCount: number;
      dateAdded?: string;
      upc?: string;
      editorialVideo?: EditorialVideo;
      url: string;
      personalRating?: number;
      inLibrary?: boolean;
      inFavorites?: boolean;
    };
    relationships?: {
      artists: Relationship<Artists>;
      genres: Relationship<Genres>;
      tracks: Relationship<MusicVideos | Songs>;
      library: Relationship<LibraryAlbums>;
      "record-labels": Relationship<RecordLabels>;
    } & Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
    views: {
      "appears-on": View<Playlists>;
      "other-versions": View<Albums>;
      "related-albums": View<Albums>;
      "related-videos": View<MusicVideos>;
    };
  }

  /**
   * A resource object that represents a library album.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/libraryalbums/)
   */
  interface LibraryAlbums extends Albums {
    type: "library-albums";
    attributes: Albums['attributes'] & {
      dateAdded?: string;
      // Library albums don't have some catalog-specific fields
      releaseDate?: string;
      trackCount: number;
      personalRating?: number;
      inFavorites?: boolean;
    };
    relationships?: {
      artists: Relationship<Artists>;
      catalog: Relationship<Playlists>;
      tracks: Relationship<MusicVideos | Songs>;
    } & Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
    // Remove some catalog-specific views that don't apply to library albums
    views?: undefined;
  }

  /**
   * A resource object that represents a library song.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/librarysongs/)
   */
  interface LibrarySongs extends Songs {
    type: "library-songs";
    attributes: Songs['attributes'] & {
      // Library songs have all the same attributes as catalog songs
      personalRating?: number;
      inFavorites?: boolean;
    };
    relationships?: {
      albums?: Relationship<Albums>;
      artists?: Relationship<Artists>;
      genres?: Relationship<Genres>;
      station?: Relationship<Stations>;
      composers?: Relationship<Artists>;
      library?: Relationship<LibraryAlbums>;
      "music-videos"?: Relationship<MusicVideos>;
    };
    // Library songs don't have views
    views?: undefined;
  }

  /**
   * A resource object that represents a library playlist.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/libraryplaylists/)
   */
  interface LibraryPlaylists extends Resource {
    id: MusicItemID;
    type: "library-playlists" | "library-playlist-folders";
    attributes: {
      // Library-specific attributes
      hasCollaboration?: boolean;
      lastModifiedDate: string; // in date-time ISO 8601 format
      trackCount?: number;
      canDelete: boolean;
      canEdit: boolean;
      dateAdded: string;
      
      // Common playlist attributes
      description: DescriptionAttribute;
      artwork?: Artwork;
      hasCatalog: boolean;
      isPublic: boolean;
      name: string;
      playParams: PlayParameters;
      personalRating?: number;
      inFavorites?: boolean;
    };
    relationships?: {
      catalog: Relationship<Playlists>;
      tracks: Relationship<MusicVideos | Songs>;
    };
    // Internal property used by some applications
    parent: string; // @NOTE: This is not officially used. Just internally used in Cider.
    // Library playlists don't have the same views as catalog playlists
    views?: undefined;
  }

  /**
   * A resource object that represents an artist of an album where an artist can be one or more persons.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/artists-uip)
   */
  interface Artists extends Resource {
    type: "artists";
    attributes: {
      editorialNotes?: EditorialNotes;
      genreNames: string[];
      name: string;
      url: string;
      artwork?: Artwork;
      personalRating?: number;
      inLibrary?: boolean;
      inFavorites?: boolean;
    };
    relationships?: {
      albums: Relationship<Albums>;
      genres: Relationship<Genres>;
      "music-videos": Relationship<MusicVideos>;
      playlists: Relationship<Playlists>;
      station: Relationship<Stations>;
      catalog?: Relationship<Artists>;
    } & Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
    views: {
      "appears-on-albums": View<Albums>;
      "compilation-albums": {
        href?: string;
        next?: string;
        attributes: {
          title: string;
        };
        data: Albums[];
      };
      "featured-albums": View<Albums>;
      "featured-playlists": View<Playlists>;
      "full-albums": View<Albums>;
      "latest-release": View<Albums>;
      "live-albums": View<Albums>;
      "similar-artists": View<Artists>;
      singles: View<Albums>;
      "top-music-videos": View<MusicVideos>;
      "top-songs": View<Songs>;
    };
  }

  /**
   * A resource object that represents a catalog playlist.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/playlists-ulf)
   */
  interface Playlists extends Resource {
    id: MusicItemID;
    type: "playlists";
    attributes: {
      lastModifiedDate: string;
      supportsSings: boolean;
      description: DescriptionAttribute;
      artwork: Artwork;
      url: string;
      playParams: PlayParameters;
      trackCount?: number;
      curatorName: string;
      curatorSocialHandle?: string;
      audioTraits: string[];
      editorialArtwork: EditorialArtwork;
      name: string;
      isChart: boolean;
      playlistType:
        | "editorial"
        | "external"
        | "personal-mix"
        | "replay"
        | "user-shared";
      editorialVideo?: EditorialVideo;
      editorialNotes?: EditorialNotes;
      versionHash?: string;
      trackTypes: Array<"music-videos" | "songs">;
      tags?: ["favorited"];
      personalRating?: number;
      inLibrary?: boolean;
      inFavorites?: boolean;
    };
    relationships?: {
      curator?: Relationship<Activities | AppleCurators | Curators>;
      library?: Relationship<LibraryPlaylists>;
      tracks?: Relationship<MusicVideos | Songs>;
    };
    views: {
      "featured-artists": View<Artists>;
      "more-by-curator": View<Playlists>;
    };
  }

  /**
   * A resource object that represents a podcast episode.
   * @undocumented
   */
  interface PodcastAttributes {
    offers: {
      kind: string;
      type: string;
    }[];
    contentAdvisory: string;
    copyright: string;
    artworkOrigin: "podcast";
    genreNames: string[];
    kind: string;
    mediaKind: string;
    description: DescriptionAttribute;
    artwork: Artwork;
    url: string;
    releaseDateTime: string;
    websiteUrl: string;
    durationInMilliseconds: number;
    name: string;
    guid: string;
    contentRating: ContentRating;
    artistName: string;
    subscribable: boolean;
    assetUrl: string;
  }

  /**
   * A resource object that represents a podcast episode.
   * @undocumented
   */
  interface PodcastEpisode extends Resource {
    type: "podcast-episodes";
    attributes: PodcastAttributes;
  }

  /**
   * A resource object that represents a podcast.
   * @undocumented
   */
  interface Podcasts extends Resource {
    type: "podcasts";
    attributes: PodcastAttributes & {
      seasonNumbers: number[];
      languageTag: string;
      completed: boolean;
      trackCount: number;
      displayType: string;
      createdDate: string;
      subscriptionUrl: string;
    };
  }

  /**
   * A resource object that represents an activity curator.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/activities-ui5)
   */
  interface Activities extends Resource {
    type: "activities";
    attributes: {
      artwork: Artwork;
      editorialNotes?: EditorialNotes;
      name: string;
      url: string;
    };
    relationships: {
      playlists: Relationship<Playlists>;
    };
  }

  /**
   * A resource object that represents recommended resources for a user calculated using their selected preferences.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/personalrecommendation)
   */
  interface PersonalRecommendation extends Resource {
    type: "personal-recommendation";
    attributes: {
      kind: "music-recommendations" | "recently-played" | "unknown";
      nextUpdateDate: string;
      reason: {
        stringForDisplay: string;
      };
      resourceTypes: string[];
      title: {
        stringForDisplay: string;
      };
      display?: {
        kind: string;
        decorations: unknown[];
      };
    };
    relationships?: {
      [k: string]: {
        data: Resource[];
        href: string;
      };
    };
  }

  /**
   * A resource object that represents a users Apple Music social profile.
   * @undocumented
   */
  interface SocialProfile extends Resource {
    type: "social-profiles";
    attributes: {
      artwork: Artwork;
      handle: string;
      isPrimary: boolean;
      isVerified: boolean;
      name: string;
      url: string;
    };
  }

  /**
   * A resource object that represents a grouping view
   * @undocumented
   */
  interface Groupings extends Resource {
    type: "groupings";
    attributes: {
      genreNames: string[];
      name: string;
    };
    relationships?: {
      curator: Relationship<Curators>;
      tabs: Relationship<EditorialElements>;
    } & Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
  }

  /**
   * A resource object that represents a room
   * @undocumented
   */
  interface Rooms extends Resource {
    type: "rooms";
  }

  /**
   * A resource object that represents a editorial element
   * @undocumented
   */
  interface EditorialElements extends Resource {
    type: "editorial-elements";
    attributes: {
      name?: string;
      title?: string;
      editorialElementKind: string | number;
      collectionId?: string;
      emphasize?: boolean;
      featureFirstElement?: boolean;
      designBadge?:
        | "NEW ALBUM"
        | "UPDATED PLAYLIST"
        | "LISTEN NOW"
        | "NEW PLAYLIST"
        | "NEW RELEASE"
        | string;
      displayStyle?: "compact" | "expanded";
      keySwoosh?: "FeaturedPlaylists" | "ArtistsPlaylists" | string;
      doNotFilter?: boolean;
      lastModifiedDate?: string;
      links?: {
        label: string;
        url: string;
        target?: "external" | "internal";
      }[];
      type?: "normal";
      supportedSorts?: string[];
      description?: string;
    };
    id: "default" | string;
    relationships?: {
      children: Relationship<EditorialElements>;
      contents?: Relationship<Resource>;
      room?: Relationship<Rooms>;
    } & Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
  }

  /**
   * A resource object that represents an editorial item
   * @undocumented
   */
  interface EditorialItem extends Resource {
    type: "editorial-items";
    attributes: {
      plainEditorialNotes: EditorialNotes;
      plainEditorialCard: PlainEditorialCard;
      editorialArtwork: EditorialArtwork;
      editorialVideo: EditorialVideo;
      link: {
        url: string;
        target: "internal" | "external";
        feature: "internal" | "external";
      };
      url: string;
    };
    meta?: {
      editorialCard: string;
    };
  }

  interface PlainEditorialCard {
    [key: string]: {
      kind: EditorialArtworkTypes;
      display: {
        decorations: "gradient" | unknown[];
      };
      plainEditorialNotes: EditorialNotes;
      editorialArtwork: EditorialArtwork;
      editorialVideo: EditorialVideo;
    };
  }

  /**
   * A resource object that represents a lyrics object
   * @undocumented
   */
  interface Lyrics extends Resource {
    type: "lyrics";
    attributes: {
      playParams: PlayParameters;
      ttml: string;
    };
  }

  /**
   * A resource object that represents a credit object
   * @undocumented
   */
  interface Credit extends Resource {
    type: "role-categories";
    attributes: {
      kind:
        | "performer"
        | "composer-and-lyrics"
        | "production-and-engineering"
        | string;
      title: string;
    };
    relationships?: {
      "credit-artists": Relationship<CreditArtist>;
    } & Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
  }

  /**
   * A resource object that represents a credit artist
   * @undocumented
   */
  interface CreditArtist extends Resource {
    type: "credit-artists";
    attributes: {
      name: string;
      roleNames: string[];
      artwork: Artwork;
    };
  }

  /**
   * A resource object that represents a rating for a resource.
   * @undocumented
   */
  interface Rating extends Resource {
    type: "ratings";
    attributes: {
      value: number;
    };
  }

  /**
   * A resource object that represents the audio analysis of a song.
   * @undocumented
   */
  interface AudioAnalysis extends Resource {
    type: "audio-analysis";
    attributes: {
      acousticness: {
        beginning: number;
        ending: number;
        main: number;
      };
      beats: {
        barsInMilliseconds: number[];
        beatsInMilliseconds: number[];
      };
      bpm: {
        beginning: number;
        ending: number;
        main: number;
        percentDeviation: number;
      };
      danceability: {
        beginning: number;
        ending: number;
        main: number;
      };
      energy: {
        beginning: number;
        ending: number;
        main: number;
      };
      key: {
        beginning: { tonic: string; mode: string };
        ending: { tonic: string; mode: string };
        main: { tonic: string; mode: string };
      };
      loudness: {
        beginning: { peak: number; range: number; value: number };
        ending: { peak: number; range: number; value: number };
        main: { peak: number; range: number; value: number };
      };
      melodicness: {
        beginning: number;
        ending: number;
        main: number;
      };
      valence: {
        beginning: number;
        ending: number;
        main: number;
      };
    };
  }

  /**
   * A resource object that represents the replay summary for a user.
   * @undocumented
   */
  interface ReplaySummary extends Resource {
    type: "music-summaries";
    attributes: {
      period: "year" | "month";
      year: number;
      month?: number;
      topSongCount: number;
      listenTimeInMinutes: number;
      uniqueStationCount: number;
      uniqueGenreCount: number;
      uniqueAlbumCount: number;
      uniqueArtistCount: number;
      uniquePlaylistCount: number;
      uniqueSongCount: number;
    };
    topGenres: {
      genre: string;
      count: number;
    }[];
    views: {
      "top-albums": Relationship<ReplayItemSummary>;
      "top-artists": Relationship<ReplayItemSummary>;
      "top-songs": Relationship<ReplayItemSummary>;
    };
    relationships: {
      playlist?: Relationship<Playlists>;
    };
  }

  /**
   * A resource object that represents the replay milestone for a user.
   * @undocumented
   */
  interface ReplayMilestone extends Resource {
    type: "music-summaries-milestones";
    attributes: {
      listenTimeInMinutes: number;
      dateReached: string;
      value: number;
      kind: "listen-time" | "artist" | "song";
    };
    relationships: {
      "top-albums": Relationship<Albums>;
      "top-artists": Relationship<Artists>;
      "top-songs": Relationship<Songs>;
    };
  }

  /**
   * A resource object that represents the replay song summary for a user.
   * @undocumented
   */
  interface ReplayItemSummary extends Resource {
    type:
      | "song-period-summaries"
      | "artist-period-summaries"
      | "album-period-summaries";
    attributes: {
      firstPlayed: string;
      lastPlayed: string;
      playCount: number;
      listenTimeInMinutes?: number;
    };
    relationships?: {
      song?: Relationship<Songs>;
      artist?: Relationship<Artists>;
      album?: Relationship<Albums>;
    } & Record<string, Relationship<Resource> | Array<Relationship<Resource>>>;
  }

  /**
   * An object that represents a suggestion returned from search calls
   */
  interface Suggestion {
    displayTerm?: string;
    kind: "terms" | "topResults";
    searchTerm?: string;
    source?: string;
    content?: MusicKit.Resource;
  }

  /**
   * An object that represents editorial notes.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/musickit/editorialnotes)
   */
  interface EditorialNotes {
    hashValue?: number;
    name?: string;
    short?: string;
    standard?: string;
    tagline?: string;
  }

  /**
   * An object that represents artwork for a music item.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/musickit/artwork)
   */
  interface Artwork {
    bgColor: string;
    height: number;
    width: number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    /**
     * This type represents the Artwork URL for a music item.
     * The URL commonly is comprised of variables that can be replaced with the desired values.
     * These variables can extend to the following: (Bear in mind that some variables may be pre-defined in the URL of the item)
     * - {w} - The width of the image in pixels.
     * - {h} - The height of the image in pixels.
     * - {f} - The format of the image. (See ArtworkFormats)
     * - {c} - The artwork kind. (See ArtworkKinds)
     * @example https://example.com/{w}x{h}{c}.{f}
     * @undocumented
     */
    url: string;
    hasP3?: boolean;
  }

  /**
   * Artwork kinds for a music item.
   * - br: Artwork blur map(ish)
   * - vf: Used for Artist banners
   */
  type ArtworkKinds = "cc" | "sr" | "bb" | "br" | "vf";

  /**
   * The format of the artwork for a music item.
   */
  type ArtworkFormats = "jpg" | "jpeg" | "png" | "webp" | "tiff" | "svg";

  /**
   * The type of editorial artwork for a music item.
   */
  type EditorialArtworkTypes =
    | "superHeroTall"
    | "superHeroWide"
    | "storeFlowcase"
    | "subscriptionHero"
    | "subscriptionCover"
    | "staticDetailSquare"
    | "staticDetailTall"
    | "brandLogo";

  /**
   * An object that represents artwork for a music item.
   * @undocumented
   */
  type EditorialArtwork = { [key in EditorialArtworkTypes]: Artwork };

  /**
   * The types of editorial videos for a music item.
   */
  type EditorialVideoTypes =
    | "motionSquareVideo1x1"
    | "motionTallVideo3x4"
    | "motionWideVideo21x9"
    | "motionDetailTall"
    | "motionDetailSquare";

  /**
   * An object that represents the editorial video for a music item.
   * @undocumented
   */
  interface Video {
    previewFrame: Artwork;
    video: string;
  }

  /**
   * An object that represents an editorial video (animated artwork) for a music item.
   * @undocumented
   */
  type EditorialVideo = { [key in EditorialVideoTypes]: Video };

  /**
   * An object that represents a preview for resources.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/preview)
   */
  interface Preview {
    artwork: Artwork;
    url: string;
    hlsUrl: string;
  }

  /**
   * An object that represents a description attribute.
   * [MusicKit Swift Documentation](https://developer.apple.com/documentation/applemusicapi/descriptionattribute/)
   */
  interface DescriptionAttribute {
    short: string;
    standard: string;
    long?: string;
  }

  /**
   * Generic search result interface.
   */
  interface SearchResult<T> {
    data: T[];
    href?: string;
    next?: string;
  }

  /**
   * Generic search chart result interface.
   */
  interface SearchChartResult<T> {
    chart: string;
    data: T[];
    href?: string;
    name: string;
    next?: string;
  }

  type QueryParameters = Record<string, any>;

  type QueryOptions = {
    includeResponseMeta?: boolean;
    fetchOptions?: RequestInit;
  };

  /**
   * The parameters that can be passed to an API call
   * @note This contains wildcard types for whenever https://github.com/microsoft/TypeScript/issues/41160 is resolved.
   */
  interface v3MusicRoutes {
    "v1/me/library/songs": MusicKit.Songs[];
    "v1/me/library/songs/*": MusicKit.Songs[];

    "v1/me/library/albums": MusicKit.Albums[];
    "v1/me/library/artists": MusicKit.Artists[];

    "/v1/me/recent/played": MusicKit.Songs[] | MusicKit.Albums[];

    "v1/me/library/playlists": MusicKit.Playlists[];
    "v1/me/library/playlists/*": MusicKit.Playlists[];

    "v1/me/library/search":
      | MusicKit.Songs[]
      | MusicKit.Albums[]
      | MusicKit.Artists[]
      | MusicKit.Playlists[];

    "v1/storefronts": MusicKit.Storefronts[];

    // Ratings can be retrieved for any resource type.
    "v1/me/rating/songs": MusicKit.Rating[];
    "v1/me/rating/albums": MusicKit.Rating[];
    "v1/me/rating/playlists": MusicKit.Rating[];

    "am/groupings": MusicKit.Groupings[];
  }

  type QueryResources = {
    [K in keyof MusicKit.ResourceMap]?: {
      [id: string]: MusicKit.ResourceMap[K];
    };
  };
  type ResourceTypes = keyof ResourceMap;

  // Query Response Template
  interface QueryResponse<T = unknown> {
    data: {
      data: T;
      resources: QueryResources;
      results: QueryResult;
      next: string;
      meta: {
        total: number;
        latestYear: number;
        isEndOfYear: boolean;
        metrics?: {
          dataSetId: string;
        };
      };
    };
    request: unknown;
    response: unknown;
  }

  interface QueryResult {
    target?: string;
    activities?: SearchResult<Activities>;
    albums?: SearchResult<Albums>;
    "apple-curators"?: SearchResult<AppleCurators>;
    artists?: SearchResult<Artists>;
    curators?: SearchResult<Curators>;
    "music-videos"?: SearchResult<MusicVideos>;
    playlists?: SearchResult<Playlists>;
    "record-labels"?: SearchResult<RecordLabels>;
    stations?: SearchResult<Stations>;
    songs?: SearchResult<Songs>;
    badgingMap?: SearchResult<unknown>;
    suggestions?: Suggestion[];
    top?: {
      data: Array<
        | Activities
        | Albums
        | AppleCurators
        | Artists
        | Curators
        | MusicVideos
        | Playlists
        | RecordLabels
        | Songs
        | Stations
      >;
    };
  }

  /**
   * This class represents the Apple Music API.
   * [MusicKit.js Documentation](https://js-cdn.music.apple.com/musickit/v3/docs/index.html?path=/docs/reference-javascript-api--page)
   */
  interface API {
    /**
     * Search for resources, using the music REST API.
     */
    music<T extends keyof v3MusicRoutes>(
      route: T | string,
      parameters?: QueryParameters,
      options?: QueryOptions,
    ): Promise<QueryResponse<v3MusicRoutes[T] | any>>;

    /**
     * The storefront used for making calls to the API.
     */
    storefrontId: string;
  }
}
