declare namespace MusicKit {
  /**
   * The main MusicKit instance providing access to Apple Music functionality.
   * 
   * This is the primary interface for interacting with Apple Music services,
   * including playback control, API access, user authentication, and library management.
   * The instance extends the Player interface and adds additional capabilities
   * specific to the full MusicKit experience.
   * 
   * @see [MusicKit.js Documentation](https://js-cdn.music.apple.com/musickit/v3/docs/index.html?path=/docs/reference-javascript-musickit-instance--page)
   */
  interface MusicKitInstance extends Player {
    /** Platform and feature capabilities of the current environment. */
    capabilities: any;

    /**
     * Apple Music API client for accessing catalog and library data.
     * 
     * Provides methods for searching, fetching, and managing Apple Music content
     * including songs, albums, playlists, and user library items.
     */
    readonly api: API;

    /**
     * Current audio quality setting for playback.
     * 
     * Indicates whether the player is using high-quality (256kbps) or
     * standard quality (64kbps) audio streams.
     */
    readonly bitrate: PlaybackBitrate;
    /**
     * The developer token to identify yourself as a trusted developer and
     * member of the Apple Developer Program.
     */
    readonly developerToken: string;
    /**
     * A Boolean value indicating whether the user has authenticated and
     * authorized the application for use.
     */
    readonly isAuthorized: boolean;
    /**
     * A user token used to access personalized Apple Music content.
     */
    readonly musicUserToken: string;
    /**
     * The current playback state of the music player.
     */
    readonly playbackState: PlaybackStates;
    /**
     * A Boolean value that indicates if a playback target is available.
     */
    readonly playbackTargetAvailable: boolean;
    /**
     * An instance of the MusicKit player.
     */
    readonly player: Player;
    /**
     * The current storefront for the configured MusicKit instance.
     */
    readonly storefrontId: string;
    /**
     * The current storefront country code for the configured MusicKit instance.
     */
    readonly storefrontCountryCode: string;
    /**
     * Private mode is a mode that allows you to play music without song being saved to history.
     */
    privateEnabled: boolean;
    /**
     * The current volume
     */
    volume: number;
    /**
     * The state of autoplay.
     */
    autoplayEnabled: boolean;
    /**
     * The playback speed.
     */
    playbackRate: number;
    /**
     * The current playback progress
     */
    currentPlaybackProgress: number;

    /**
     * Add an event listener for a MusicKit instance by name.
     *
     * @param name The name of the event.
     * @param callback The callback function to invoke when the event occurs.
     */
    addEventListener<K extends keyof MusicKit.Events>(
      name: K,
      callback: (event: MusicKit.Events[K]) => void,
    ): void;

    /**
     * Add a media item to the users library.
     * @param id The id of the media item to add to the library.
     * @param type The type of the media item to add to the library.
     *
     * @returns A promise containing a dictionary of the media item ids that were added to the library.
     */
    addToLibrary(
      id: string,
      type?: string,
    ): Promise<{
      [type: string]: string[];
    }>;

    /**
     * Returns a promise containing a music user token when a user has
     * authenticated and authorized the app.
     */
    authorize(): Promise<string>;

    /**
     * Begins playing the media item at the specified index in the queue.
     *
     * @param index The queue index to begin playing media.
     */
    changeToMediaAtIndex(index: number): Promise<number>;

    /**
     * Pauses playback of the media player.
     */
    pause(): void;

    /**
     * Begins playback of the current media item.
     */
    play(): Promise<MediaItemPosition>;

    /**
     * No description available.
     */
    playLater(options: SetQueueOptions): Promise<void>;

    /**
     * No description available.
     */
    playNext(options: SetQueueOptions): Promise<void>;

    /**
     * Removes an event listener for a MusicKit instance by name.
     *
     * @param name The name of the event.
     * @param callback The callback function to remove.
     */
    removeEventListener<K extends keyof MusicKit.Events>(
      name: K,
      callback?: (event: MusicKit.Events[K]) => void,
    ): void;

    /**
     * Sets the playback point to a specified time.
     *
     * @param time The time to set as the playback point.
     */
    seekToTime(time: number): Promise<any>;

    /**
     * Sets a music player's playback queue using queue options.
     *
     * @param options The option used to set the playback queue.
     */
    setQueue(options: SetQueueOptions): Promise<Queue>;

    /**
     * The musickit queue
     **/
    queue: Queue;

    /**
     * Clear the queue
     */
    clearQueue(): void;

    /**
     * Starts playback of the next media item in the playback queue.
     */
    skipToNextItem(): Promise<MediaItemPosition>;

    /**
     * Starts playback of the previous media item in the playback queue.
     */
    skipToPreviousItem(): Promise<MediaItemPosition>;

    /**
     * Stops playback of the media player.
     */
    stop(): void;

    /**
     * Unauthorizes the app for the current user.
     */
    unauthorize(): Promise<any>;

    /**
     * The container element for the video player. Should contain a video element.
     */
    videoContainerElement: HTMLDivElement;

    /**
     * Save the current playback state
     */
    savePlaybackState(): void;

    /**
     * Restore the previous playback state
     */
    restorePlaybackState(): void;

    /**
     * The previous playback state
     */
    _previousPlaybackState: {
      autoplayEnabled: boolean;
      playbackMode: number;
      repeatMode: number;
      shuffleMode: number;
      volume: number;
    };

    /**
     * Services
     */
    services?: any;
    previewOnly?: boolean;
    _bag: any;
  }
}
